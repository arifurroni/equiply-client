"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

import { auth } from "@/lib/auth";
import { equipmentSchema } from "@/lib/validation";
import { fetchWithTimeout } from "@/lib/api";
import type { TActionState } from "@/types";

/**
 * lib/action — all MUTABLE API calls (create/update/delete) go through here.
 * Server actions run on the server, so secrets stay secret.
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const IMGBB_UPLOAD_URL = "https://api.imgbb.com/1/upload";

/** Uploads the image to imgbb and returns its public URL. */
async function uploadImageToImgbb(file: File): Promise<string> {
  const apiKey = process.env.IMGBB_API_KEY;

  if (!apiKey) {
    throw new Error(
      "Image upload is not configured. Add IMGBB_API_KEY to your .env file."
    );
  }

  const formData = new FormData();
  formData.append("image", file);

  const res = await fetchWithTimeout(
    `${IMGBB_UPLOAD_URL}?key=${apiKey}`,
    {
      method: "POST",
      body: formData,
    },
    15_000
  );

  const json = await res.json().catch(() => null);

  if (!res.ok || !json?.success) {
    throw new Error(json?.error?.message || "Image upload failed.");
  }

  return json.data.url as string;
}

/**
 * Creates an equipment for the signed-in owner.
 * 1. Verifies the Better Auth session server-side (never trusts the client)
 * 2. Re-validates the form data with the same Zod schema
 * 3. Uploads the image to imgbb
 * 4. POSTs the payload to the Express API
 * 5. Revalidates the owner equipments page so the table refreshes
 */
export async function createService(
  formData: FormData
): Promise<TActionState> {
  try {
    // --- Authentication (server-side) ---
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session?.user) {
      return { success: false, message: "You must be signed in." };
    }

    if (session.user.role !== "owner") {
      return {
        success: false,
        message: "Only owners can add equipment.",
      };
    }

    // --- Validation (same schema as the client form) ---
    const raw = Object.fromEntries(formData.entries());
    const parsed = equipmentSchema.safeParse(raw);

    if (!parsed.success) {
      return {
        success: false,
        message:
          parsed.error.issues[0]?.message || "Please fix the form errors.",
      };
    }

    const { image, rentalPrice, availableQuantity, ...rest } = parsed.data;

    // --- Image upload (imgbb) ---
    const imageUrl = await uploadImageToImgbb(image as File);

    // --- Call the Express API ---
    const payload = {
      ...rest,
      rentalPrice: Number(rentalPrice),
      availableQuantity: Number(availableQuantity),
      image: imageUrl,
      ownerId: session.user.id, // real user id from the verified session
    };

    const res = await fetchWithTimeout(
      `${API_URL}/equipments`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
      10_000
    );

    const json = await res.json().catch(() => null);

    if (!res.ok || !json?.success) {
      return {
        success: false,
        message: json?.message || "Failed to add equipment.",
      };
    }

    // --- Refresh the table ---
    revalidatePath("/dashboard/owner/equipments");

    return {
      success: true,
      message: json.message || "Equipment added successfully",
      data: json.data,
    };
  } catch (err) {
    console.error("createService error:", err);

    return {
      success: false,
      message:
        err instanceof Error ? err.message : "Something went wrong.",
    };
  }
}
