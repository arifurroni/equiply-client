"use server";

import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import type { TBookingInput, TBookingPaymentStatus } from "@/types";

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
    throw new Error("You must be signed in to book equipment.");
  }

  if (session.user.role !== "customer") {
    throw new Error("Only customers can book equipment.");
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

export async function createBookingCheckout(
  booking: TBookingInput
): Promise<{ checkoutUrl: string }> {
  const cookie = await getCustomerCookie();

  if (
    !booking ||
    typeof booking !== "object" ||
    typeof booking.equipmentId !== "string" ||
    typeof booking.startDate !== "string" ||
    typeof booking.endDate !== "string" ||
    typeof booking.quantity !== "number" ||
    typeof booking.contactNumber !== "string" ||
    typeof booking.deliveryAddress !== "string" ||
    typeof booking.additionalNotes !== "string"
  ) {
    throw new Error("Enter valid booking information.");
  }

  const response = await fetch(`${API_URL}/bookings/checkout`, {
    method: "POST",
    headers: {
      cookie,
      "content-type": "application/json",
    },
    body: JSON.stringify(booking),
    cache: "no-store",
  });

  return readApiResponse<{ checkoutUrl: string }>(response);
}

export async function getBookingPaymentStatus(
  sessionId: string
): Promise<{ paymentStatus: TBookingPaymentStatus; equipmentName: string }> {
  const cookie = await getCustomerCookie();

  if (typeof sessionId !== "string" || !sessionId.trim()) {
    throw new Error("A valid checkout session is required.");
  }

  const response = await fetch(
    `${API_URL}/bookings/session/${encodeURIComponent(sessionId.trim())}`,
    {
      headers: { cookie },
      cache: "no-store",
    }
  );

  return readApiResponse<{
    paymentStatus: TBookingPaymentStatus;
    equipmentName: string;
  }>(response);
}
