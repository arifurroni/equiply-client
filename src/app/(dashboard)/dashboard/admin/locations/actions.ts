"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

import { auth, db, type TAuthUserRecord } from "@/lib/auth";
import { LOCATIONS } from "@/lib/locations";
import type { TActionState } from "@/types";

export async function updateOwnerLocation(
  ownerId: string,
  location: string
): Promise<TActionState> {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    return { success: false, message: "You must be signed in." };
  }

  if (session.user.role !== "admin") {
    return { success: false, message: "Only admins can update owner locations." };
  }

  if (typeof ownerId !== "string" || !ownerId.trim()) {
    return { success: false, message: "A valid owner is required." };
  }

  if (typeof location !== "string") {
    return { success: false, message: "Select a valid location." };
  }

  const normalizedOwnerId = ownerId.trim();
  const normalizedLocation = location.trim();
  if (
    normalizedLocation &&
    !LOCATIONS.some((validLocation) => validLocation === normalizedLocation)
  ) {
    return { success: false, message: "Select a valid location." };
  }

  try {
    const result = normalizedLocation
      ? await db.collection<TAuthUserRecord>("user").updateOne(
          { _id: normalizedOwnerId, role: "owner" },
          { $set: { location: normalizedLocation } }
        )
      : await db.collection<TAuthUserRecord>("user").updateOne(
          { _id: normalizedOwnerId, role: "owner" },
          { $unset: { location: "" } }
        );

    if (result.matchedCount === 0) {
      return { success: false, message: "Owner account was not found." };
    }

    revalidatePath("/dashboard/admin/locations");
    revalidatePath("/dashboard/owner/locations");

    return {
      success: true,
      message: "Owner location updated.",
      data: { location: normalizedLocation || null },
    };
  } catch (error) {
    console.error("updateOwnerLocation error:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to update the owner location.",
    };
  }
}
