import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import AdminEquipmentsTable from "@/components/dashboard/admin/AdminEquipmentsTable";
import { auth } from "@/lib/auth";
import type { TAdminEquipment } from "@/types";
import { getAdminEquipments } from "./actions";

export default async function AdminAllEquipmentsPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    redirect("/signin");
  }

  if (session.user.role !== "admin") {
    redirect(`/dashboard/${session.user.role ?? "customer"}`);
  }

  let equipments: TAdminEquipment[] = [];
  let loadError: string | null = null;

  try {
    equipments = await getAdminEquipments();
  } catch (error) {
    loadError =
      error instanceof Error
        ? error.message
        : "Failed to load equipment listings.";
  }

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 p-4 sm:p-6">
      <header>
        <p className="text-sm font-semibold text-[#166534]">Administration</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#102a24]">
          All Equipment
        </h1>
        <p className="mt-1 text-sm text-[#64756b]">
          Review, update, and manage equipment listings.
        </p>
      </header>

      {loadError ? (
        <section
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-6"
        >
          <h2 className="font-semibold text-red-700">
            Could not load equipment listings
          </h2>
          <p className="mt-1 text-sm text-red-600">{loadError}</p>
          <Link
            href="/dashboard/admin/all-equipments"
            className="mt-4 inline-block rounded-xl border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-100"
          >
            Try again
          </Link>
        </section>
      ) : equipments.length === 0 ? (
        <section className="rounded-xl border border-[#dce9df] bg-white p-10 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-[#102a24]">
            No equipment listings yet
          </h2>
          <p className="mt-1 text-sm text-[#64756b]">
            Equipment submitted by owners will appear here.
          </p>
        </section>
      ) : (
        <AdminEquipmentsTable equipments={equipments} />
      )}
    </main>
  );
}