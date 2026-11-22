import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import type { TAdminRentalBooking } from "@/types";
import { getAdminRentals } from "./actions";

export default async function AdminAllRentalsPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    redirect("/signin");
  }
  if (session.user.role !== "admin") {
    redirect(`/dashboard/${session.user.role ?? "customer"}`);
  }

  let bookings: TAdminRentalBooking[] = [];
  let loadError: string | null = null;
  try {
    bookings = await getAdminRentals();
  } catch (error) {
    loadError =
      error instanceof Error
        ? error.message
        : "Failed to load rental bookings.";
  }

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 p-4 sm:p-6">
      <header>
        <p className="text-sm font-semibold text-[#166534]">Administration</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#102a24]">
          All Rentals
        </h1>
        <p className="mt-1 text-sm text-[#64756b]">
          Monitor customers, owners, bookings, and payment activity across
          Equiply.
        </p>
      </header>

      {loadError ? (
        <section
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-6"
        >
          <h2 className="font-semibold text-red-700">
            Could not load rental bookings
          </h2>
          <p className="mt-1 text-sm text-red-600">{loadError}</p>
          <Link
            href="/dashboard/admin/all-rentals"
            className="mt-4 inline-block rounded-xl border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-100"
          >
            Try again
          </Link>
        </section>
      ) : (
        <section className="overflow-hidden rounded-xl border border-[#dce9df] bg-white shadow-sm">
          <div className="flex items-center justify-between gap-3 border-b border-[#dce9df] bg-[#f0fdf4] px-4 py-3">
            <p className="text-sm font-semibold text-[#102a24]">
              Rental bookings
            </p>
            <p className="text-sm text-[#52645a]">
              {bookings.length} {bookings.length === 1 ? "booking" : "bookings"}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1150px] text-left text-sm">
              <thead className="text-[#102a24]">
                <tr className="border-b border-[#dce9df]">
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Customer Information
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Owner Information
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Equipment
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Rental Duration
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Booking Amount
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Payment Status
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Booking Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="border-b border-[#dce9df] last:border-0"
                  >
                    <td className="px-4 py-4">
                      <p className="font-semibold text-[#102a24]">
                        {booking.customer.name}
                      </p>
                      <p className="mt-0.5 text-xs text-[#64756b]">
                        {booking.customer.email || "Email unavailable"}
                      </p>
                    </td>
                    <td className="px-4 py-4">
                      <p className="font-semibold text-[#102a24]">
                        {booking.owner.name}
                      </p>
                      <p className="mt-0.5 text-xs text-[#64756b]">
                        {booking.owner.email || "Email unavailable"}
                      </p>
                    </td>
                    <td className="px-4 py-4">
                      <Link
                        href={`/equipments/${encodeURIComponent(booking.equipmentId)}`}
                        className="font-semibold text-[#166534] hover:underline"
                      >
                        {booking.equipmentName}
                      </Link>
                    </td>
                    <td className="px-4 py-4 text-[#52645a]">
                      <p className="whitespace-nowrap">
                        {booking.startDate} to {booking.endDate}
                      </p>
                      <p className="mt-0.5 text-xs text-[#64756b]">
                        {booking.rentalDays === null
                          ? "Duration unavailable"
                          : `${booking.rentalDays} day${booking.rentalDays === 1 ? "" : "s"}`}
                        {booking.quantity === null
                          ? ""
                          : ` | ${booking.quantity} unit${booking.quantity === 1 ? "" : "s"}`}
                      </p>
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 font-medium text-[#102a24]">
                      {booking.totalAmount === null
                        ? "—"
                        : new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: booking.currency.toUpperCase(),
                          }).format(booking.totalAmount)}
                    </td>
                    <td className="px-4 py-4">
                      <StatusBadge status={booking.paymentStatus} />
                    </td>
                    <td className="px-4 py-4">
                      <StatusBadge status={booking.bookingStatus} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {bookings.length === 0 && (
            <p className="p-8 text-center text-sm text-[#64756b]">
              No rental bookings have been created yet.
            </p>
          )}
        </section>
      )}
    </main>
  );
}

function StatusBadge({ status }: { status: string }) {
  const normalizedStatus = status.replaceAll("_", " ");
  const colorClass =
    status === "paid" ||
    status === "confirmed" ||
    status === "completed" ||
    status === "succeeded"
      ? "bg-green-50 text-green-700"
      : status === "failed" ||
          status === "expired" ||
          status === "cancelled"
        ? "bg-red-50 text-red-700"
        : "bg-amber-50 text-amber-700";

  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${colorClass}`}
    >
      {normalizedStatus}
    </span>
  );
}