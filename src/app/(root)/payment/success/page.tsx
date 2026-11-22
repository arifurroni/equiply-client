import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { CheckCircle2, Clock3, XCircle } from "lucide-react";

import { auth } from "@/lib/auth";
import { getBookingPaymentStatus } from "../actions";
import type { TBookingPaymentStatus } from "@/types";

type TPaymentResult = {
  paymentStatus: TBookingPaymentStatus;
  equipmentName: string;
};

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string | string[] }>;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/signin");
  }
  if (session.user.role !== "customer") {
    redirect(`/dashboard/${session.user.role ?? "customer"}`);
  }

  const search = await searchParams;
  const sessionId =
    typeof search.session_id === "string" ? search.session_id : null;
  let payment: TPaymentResult | null = null;
  let loadError: string | null = null;

  if (sessionId) {
    try {
      payment = await getBookingPaymentStatus(sessionId);
    } catch (error) {
      loadError =
        error instanceof Error
          ? error.message
          : "Could not verify the payment status.";
    }
  }

  const isPaid = payment?.paymentStatus === "paid";
  const isFailed =
    payment?.paymentStatus === "failed" ||
    payment?.paymentStatus === "expired";

  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-3xl items-center px-4 py-12 sm:px-6">
      <section className="w-full rounded-3xl border border-[#dce9df] bg-white p-6 text-center shadow-sm sm:p-10">
        {isPaid ? (
          <CheckCircle2
            aria-hidden="true"
            className="mx-auto size-14 text-[#166534]"
          />
        ) : isFailed ? (
          <XCircle aria-hidden="true" className="mx-auto size-14 text-red-600" />
        ) : (
          <Clock3
            aria-hidden="true"
            className="mx-auto size-14 text-amber-600"
          />
        )}

        <h1 className="mt-5 text-2xl font-bold text-[#102a24]">
          {isPaid
            ? "Payment successful"
            : isFailed
              ? "Payment not completed"
              : "Payment confirmation pending"}
        </h1>

        {payment?.paymentStatus === "paid" ? (
          <p className="mt-3 text-sm leading-6 text-[#52645a]">
            Your payment for <strong>{payment.equipmentName}</strong> has been
            confirmed by Stripe and your booking is confirmed.
          </p>
        ) : isFailed ? (
          <p className="mt-3 text-sm leading-6 text-[#52645a]">
            This checkout session was {payment?.paymentStatus}. No successful
            payment was recorded for the booking.
          </p>
        ) : loadError ? (
          <p role="alert" className="mt-3 text-sm leading-6 text-red-600">
            {loadError}
          </p>
        ) : sessionId ? (
          <p className="mt-3 text-sm leading-6 text-[#52645a]">
            Stripe returned you to Equiply, but the backend has not received
            payment confirmation yet. This page will show success only after
            the verified Stripe webhook updates your booking.
          </p>
        ) : (
          <p className="mt-3 text-sm leading-6 text-[#52645a]">
            No checkout session was provided, so Equiply cannot verify a
            payment.
          </p>
        )}

        <div className="mt-7 flex flex-wrap justify-center gap-3">
          {sessionId && !isPaid && !isFailed && (
            <Link
              href={`/payment/success?session_id=${encodeURIComponent(sessionId)}`}
              className="rounded-xl border border-[#dce9df] px-5 py-3 text-sm font-semibold text-[#166534] hover:bg-[#f0fdf4]"
            >
              Check status again
            </Link>
          )}
          <Link
            href="/dashboard/customer/my-rentals"
            className="rounded-xl bg-[#166534] px-5 py-3 text-sm font-semibold text-white hover:bg-[#102a24]"
          >
            View My Rentals
          </Link>
          <Link
            href="/equipments"
            className="rounded-xl border border-[#dce9df] px-5 py-3 text-sm font-semibold text-[#166534] hover:bg-[#f0fdf4]"
          >
            Browse Equipment
          </Link>
        </div>
      </section>
    </main>
  );
}
