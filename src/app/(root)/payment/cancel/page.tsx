import Link from "next/link";
import { CircleDollarSign } from "lucide-react";

export default function PaymentCancelPage() {
  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-3xl items-center px-4 py-12 sm:px-6">
      <section className="w-full rounded-3xl border border-[#dce9df] bg-white p-6 text-center shadow-sm sm:p-10">
        <CircleDollarSign
          aria-hidden="true"
          className="mx-auto size-14 text-amber-600"
        />
        <h1 className="mt-5 text-2xl font-bold text-[#102a24]">
          Checkout was not completed
        </h1>
        <p className="mt-3 text-sm leading-6 text-[#52645a]">
          No payment is considered successful on this page. Your temporary
          equipment reservation remains in place until the Stripe Checkout
          session expires; the backend then releases it.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link
            href="/equipments"
            className="rounded-xl bg-[#166534] px-5 py-3 text-sm font-semibold text-white hover:bg-[#102a24]"
          >
            Return to Equipment
          </Link>
          <Link
            href="/dashboard/customer/my-rentals"
            className="rounded-xl border border-[#dce9df] px-5 py-3 text-sm font-semibold text-[#166534] hover:bg-[#f0fdf4]"
          >
            View My Rentals
          </Link>
        </div>
      </section>
    </main>
  );
}
