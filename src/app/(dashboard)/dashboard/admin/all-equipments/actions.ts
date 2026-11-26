"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

import { auth } from "@/lib/auth";
import { fetchWithTimeout } from "@/lib/api";
import type {
  TAdminEquipment,
  TAdminEquipmentUpdate,
  TEquipmentApprovalStatus,
} from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const APPROVAL_STATUSES: TEquipmentApprovalStatus[] = [
  "pending",
  "approved",
  "rejected",
];

type TApiResponse<T> = {
  success: boolean;
  message?: string;
  data: T;
};

async function getAdminCookie(): Promise<string> {
  const requestHeaders = await headers();
  const session = await auth.api.getSession({ headers: requestHeaders });

  if (!session?.user) {
    throw new Error("You must be signed in to manage equipment.");
  }

  if (session.user.role !== "admin") {
    throw new Error("Only admins can manage equipment.");
  }

  const cookie = requestHeaders.get("cookie");
  if (!cookie) {
    throw new Error("Your session cookie is missing. Please sign in again.");
  }

  return cookie;
}

async function readApiResponse<T>(response: Response): Promise<T> {
  const result = (await response.json()) as TApiResponse<T>;

  if (!response.ok || !result.success) {
    throw new Error(
      result.message || `Request failed with status ${response.status}.`
    );
  }

  return result.data;
}

async function mutateEquipment(
  path: string,
  method: "PATCH" | "DELETE",
  cookie: string,
  body?: object
): Promise<void> {
  const response = await fetchWithTimeout(
    `${API_URL}${path}`,
    {
      method,
      headers: body
        ? { cookie, "content-type": "application/json" }
        : { cookie },
      body: body ? JSON.stringify(body) : undefined,
      cache: "no-store",
    },
    10_000
  );

  await readApiResponse<unknown>(response);
  revalidatePath("/dashboard/admin/all-equipments");
  revalidatePath("/equipments");
  revalidatePath("/");
}

export async function getAdminEquipments(): Promise<TAdminEquipment[]> {
  const cookie = await getAdminCookie();
  const response = await fetchWithTimeout(`${API_URL}/equipments/admin`, {
    headers: { cookie },
    cache: "no-store",
  });

  return readApiResponse<TAdminEquipment[]>(response);
}

export async function setEquipmentApprovalStatus(
  equipmentId: string,
  status: TEquipmentApprovalStatus
): Promise<void> {
  const cookie = await getAdminCookie();

  if (
    typeof equipmentId !== "string" ||
    !equipmentId.trim() ||
    equipmentId.length > 128 ||
    !APPROVAL_STATUSES.includes(status)
  ) {
    throw new Error("Select a valid equipment and approval status.");
  }

  await mutateEquipment(
    `/equipments/admin/${encodeURIComponent(equipmentId.trim())}/approval`,
    "PATCH",
    cookie,
    { approvalStatus: status }
  );
}

export async function updateAdminEquipment(
  equipmentId: string,
  updates: TAdminEquipmentUpdate
): Promise<void> {
  const cookie = await getAdminCookie();

  if (
    typeof equipmentId !== "string" ||
    !equipmentId.trim() ||
    equipmentId.length > 128 ||
    !updates ||
    typeof updates !== "object" ||
    Array.isArray(updates)
  ) {
    throw new Error("Select a valid equipment listing.");
  }

  await mutateEquipment(
    `/equipments/admin/${encodeURIComponent(equipmentId.trim())}`,
    "PATCH",
    cookie,
    updates
  );
}

export async function deleteAdminEquipment(equipmentId: string): Promise<void> {
  const cookie = await getAdminCookie();

  if (
    typeof equipmentId !== "string" ||
    !equipmentId.trim() ||
    equipmentId.length > 128
  ) {
    throw new Error("Select a valid equipment listing.");
  }

  await mutateEquipment(
    `/equipments/admin/${encodeURIComponent(equipmentId.trim())}`,
    "DELETE",
    cookie
  );
}
