"use server";

import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import type { TAdminRentalBooking } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

type TApiResponse<T> = {
  success: boolean;
  message?: string;
  data: T;
};

export async function getAdminRentals(): Promise<TAdminRentalBooking[]> {
  const requestHeaders = await headers();
  const session = await auth.api.getSession({ headers: requestHeaders });

  if (!session?.user) {
    throw new Error("You must be signed in to view rental bookings.");
  }
  if (session.user.role !== "admin") {
    throw new Error("Only admins can view all rental bookings.");
  }

  const cookie = requestHeaders.get("cookie");
  if (!cookie) {
    throw new Error("Your session cookie is missing. Please sign in again.");
  }

  const response = await fetch(`${API_URL}/bookings/admin`, {
    headers: { cookie },
    cache: "no-store",
  });
  const result = (await response.json()) as TApiResponse<
    TAdminRentalBooking[]
  >;

  if (!response.ok || !result.success) {
    throw new Error(
      result.message || `Request failed with status ${response.status}.`
    );
  }

  return result.data;
}
