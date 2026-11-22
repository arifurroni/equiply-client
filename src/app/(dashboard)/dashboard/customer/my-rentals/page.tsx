import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import type { TCustomerBooking } from "@/types";
import { getCustomerBookings } from "./actions";

export default async function CustomerMyRentalsPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    redirect("/signin");
  }
  if (session.user.role !== "customer") {
    redirect(`/dashboard/${session.user.role ?? "customer"}`);
  }

  let bookings: TCustomerBooking[] = [];
  let loadError: string | null = null;
  try {
    bookings = await getCustomerBookings();
  } catch (error) {
    loadError =
      error instanceof Error ? error.message : "Failed to load your rentals.";
  }

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 p-4 sm:p-6">
      <header>
        <p className="text-sm font-semibold text-[#166534]">
          Customer dashboard
        </p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#102a24]">
          My Rentals
        </h1>
        <p className="mt-1 text-sm text-[#64756b]">
          Review your bookings and payment status.
        </p>
      </header>

      {loadError ? (
        <section
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-6"
        >
          <h2 className="font-semibold text-red-700">
            Could not load your rentals
          </h2>
          <p className="mt-1 text-sm text-red-600">{loadError}</p>
          <Link
            href="/dashboard/customer/my-rentals"
            className="mt-4 inline-block rounded-xl border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-100"
          >
            Try again
          </Link>
        </section>
      ) : (
        <section className="overflow-hidden rounded-xl border border-[#dce9df] bg-white shadow-sm">
          <div className="flex items-center justify-between gap-3 border-b border-[#dce9df] bg-[#f0fdf4] px-4 py-3">
            <p className="text-sm font-semibold text-[#102a24]">
              Booking history
            </p>
            <p className="text-sm text-[#52645a]">
              {bookings.length} {bookings.length === 1 ? "booking" : "bookings"}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-240 text-left text-sm">
              <thead className="text-[#102a24]">
                <tr className="border-b border-[#dce9df]">
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Equipment
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Rental Start
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Rental End
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Booking Date
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Total Amount
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
                    key={booking._id}
                    className="border-b border-[#dce9df] last:border-0"
                  >
                    <td className="px-4 py-4">
                      <Link
                        href={`/equipments/${booking.equipmentId}`}
                        className="font-semibold text-[#166534] hover:underline"
                      >
                        {booking.equipmentName}
                      </Link>
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-[#52645a]">
                      {booking.startDate}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-[#52645a]">
                      {booking.endDate}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-[#52645a]">
                      {new Date(booking.createdAt).toLocaleDateString("en-GB", {
                        timeZone: "Asia/Dhaka",
                      })}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 font-medium text-[#102a24]">
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: booking.currency.toUpperCase(),
                      }).format(booking.totalAmount)}
                    </td>
                    <td className="px-4 py-4 capitalize text-[#52645a]">
                      {booking.paymentStatus}
                    </td>
                    <td className="px-4 py-4 capitalize text-[#52645a]">
                      {booking.bookingStatus.replaceAll("_", " ")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {bookings.length === 0 && (
            <p className="p-8 text-center text-sm text-[#64756b]">
              You do not have any bookings yet. Browse equipment to get started.
            </p>
          )}
        </section>
      )}
    </main>
  );
}