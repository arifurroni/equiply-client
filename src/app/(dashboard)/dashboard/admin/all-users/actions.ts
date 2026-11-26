"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

import { auth } from "@/lib/auth";
import { fetchWithTimeout } from "@/lib/api";
import { LOCATIONS } from "@/lib/locations";
import type {
  TActionState,
  TAdminUser,
  TAdminUserUpdate,
  TUserRole,
} from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const ROLES: TUserRole[] = ["customer", "owner", "admin"];

type TApiResponse<T> = {
  success: boolean;
  message?: string;
  data: T;
};

async function getAdminCookie(): Promise<string> {
  const requestHeaders = await headers();
  const session = await auth.api.getSession({ headers: requestHeaders });

  if (!session?.user) {
    throw new Error("You must be signed in to manage users.");
  }

  if (session.user.role !== "admin") {
    throw new Error("Only admins can manage users.");
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
    throw new Error(result.message || `Request failed with status ${response.status}.`);
  }

  return result.data;
}

export async function getAdminUsers(): Promise<TAdminUser[]> {
  const cookie = await getAdminCookie();
  const response = await fetchWithTimeout(`${API_URL}/users`, {
    headers: { cookie },
    cache: "no-store",
  });

  return readApiResponse<TAdminUser[]>(response);
}

export async function updateAdminUser(
  userId: string,
  updates: TAdminUserUpdate
): Promise<TActionState> {
  const cookie = await getAdminCookie();

  if (typeof userId !== "string" || !userId.trim() || userId.length > 128) {
    return { success: false, message: "Select a valid user." };
  }

  if (!updates || typeof updates !== "object" || Array.isArray(updates)) {
    return { success: false, message: "Select a valid role or location." };
  }

  const keys = Object.keys(updates);
  if (
    keys.length === 0 ||
    keys.some((key) => key !== "role" && key !== "location")
  ) {
    return { success: false, message: "Select a valid role or location." };
  }

  if (updates.role !== undefined && !ROLES.includes(updates.role)) {
    return { success: false, message: "Select a valid role." };
  }

  if (
    updates.location !== undefined &&
    !LOCATIONS.includes(updates.location)
  ) {
    return { success: false, message: "Select a valid location." };
  }

  const response = await fetchWithTimeout(
    `${API_URL}/users/${encodeURIComponent(userId.trim())}`,
    {
      method: "PATCH",
      headers: {
        cookie,
        "content-type": "application/json",
      },
      body: JSON.stringify(updates),
      cache: "no-store",
    },
    10_000
  );

  try {
    const data = await readApiResponse<{ id: string }>(response);
    revalidatePath("/dashboard/admin/all-users");
    return {
      success: true,
      message: "User updated successfully.",
      data,
    };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    throw error;
  }
}
