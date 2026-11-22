"use server";

import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import type { TCustomerBooking } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

type TApiResponse<T> = {
  success: boolean;
  message?: string;
  data: T;
};

export async function getCustomerBookings(): Promise<TCustomerBooking[]> {
  const requestHeaders = await headers();
  const session = await auth.api.getSession({ headers: requestHeaders });

  if (!session?.user) {
    throw new Error("You must be signed in to view your rentals.");
  }
  if (session.user.role !== "customer") {
    throw new Error("Only customers can view their rentals.");
  }

  const cookie = requestHeaders.get("cookie");
  if (!cookie) {
    throw new Error("Your session cookie is missing. Please sign in again.");
  }

  const response = await fetch(`${API_URL}/bookings/mine`, {
    headers: { cookie },
    cache: "no-store",
  });
  const result = (await response.json()) as TApiResponse<TCustomerBooking[]>;

  if (!response.ok || !result.success) {
    throw new Error(
      result.message || `Request failed with status ${response.status}.`
    );
  }

  return result.data;
}
