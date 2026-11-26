"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

import { auth } from "@/lib/auth";
import { fetchWithTimeout } from "@/lib/api";
import type { TEquipment } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

type TApiResponse<T> = {
  success: boolean;
  message?: string;
  data: T;
};

async function getCustomerCookie(): Promise<string> {
  const requestHeaders = await headers();
  const session = await auth.api.getSession({ headers: requestHeaders });

  if (!session?.user) {
    throw new Error("You must be signed in to manage favorites.");
  }

  if (session.user.role !== "customer") {
    throw new Error("Only customers can manage favorites.");
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

export async function getCustomerFavorites(): Promise<TEquipment[]> {
  const cookie = await getCustomerCookie();
  const response = await fetchWithTimeout(`${API_URL}/favorites`, {
    headers: { cookie },
    cache: "no-store",
  });

  return readApiResponse<TEquipment[]>(response);
}

export async function getCustomerFavoriteStatus(
  equipmentId: string
): Promise<boolean> {
  const cookie = await getCustomerCookie();

  if (typeof equipmentId !== "string" || !equipmentId.trim()) {
    throw new Error("Select a valid equipment listing.");
  }

  const response = await fetchWithTimeout(
    `${API_URL}/favorites/status/${encodeURIComponent(equipmentId.trim())}`,
    {
      headers: { cookie },
      cache: "no-store",
    }
  );
  const result = await readApiResponse<{ isFavorite: boolean }>(response);

  return result.isFavorite;
}

async function updateFavorite(
  equipmentId: string,
  method: "POST" | "DELETE"
): Promise<void> {
  const cookie = await getCustomerCookie();

  if (
    typeof equipmentId !== "string" ||
    !equipmentId.trim() ||
    equipmentId.length > 128
  ) {
    throw new Error("Select a valid equipment listing.");
  }

  const response = await fetchWithTimeout(
    `${API_URL}/favorites/${encodeURIComponent(equipmentId.trim())}`,
    {
      method,
      headers: { cookie },
      cache: "no-store",
    },
    10_000
  );

  await readApiResponse<unknown>(response);
  revalidatePath("/dashboard/customer/favorites");
  revalidatePath(`/equipments/${encodeURIComponent(equipmentId.trim())}`);
}

export async function addCustomerFavorite(equipmentId: string): Promise<void> {
  await updateFavorite(equipmentId, "POST");
}

export async function removeCustomerFavorite(
  equipmentId: string
): Promise<void> {
  await updateFavorite(equipmentId, "DELETE");
}
