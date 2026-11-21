import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { PackageOpen } from "lucide-react";

import { auth } from "@/lib/auth";
import { getEquipments } from "@/lib/api";
import AddService from "@/components/dashboard/owner/AddService";
import EquipmentsTable from "@/components/dashboard/owner/EquipmentsTable";
import type { TEquipment } from "@/types";

export default async function OwnerEquipmentsPage() {
  // ---------- Protect the route (server-side) ----------
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    redirect("/signin");
  }

  if (session.user.role !== "owner") {
    redirect(`/dashboard/${session.user.role ?? "customer"}`);
  }

  // ---------- Load this owner's equipments ----------
  let equipments: TEquipment[] = [];
  let loadError: string | null = null;

  try {
    const allEquipments = await getEquipments();
    equipments = allEquipments.filter(
      (equipment) => equipment.ownerId === session.user.id
    );
  } catch (err) {
    loadError =
      err instanceof Error ? err.message : "Failed to load equipment.";
  }

  // ---------- Render ----------
  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-4 sm:p-6">
      {/* Header + Add Service button */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#102a24]">
            My Equipment
          </h1>
          <p className="mt-1 text-sm text-[#64756b]">
            Manage the equipment you have listed for rent.
          </p>
        </div>

        <AddService />
      </div>

      {/* Error state */}
      {loadError ? (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-6"
        >
          <p className="text-sm font-semibold text-red-700">
            Could not load your equipment
          </p>
          <p className="mt-1 text-sm text-red-600">{loadError}</p>
          <Link
            href="/dashboard/owner/equipments"
            className="mt-4 inline-block rounded-xl border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-700 transition-colors hover:bg-red-100"
          >
            Try again
          </Link>
        </div>
      ) : equipments.length === 0 ? (
        /* Empty state */
        <div className="rounded-xl border border-[#dce9df] bg-white p-10 text-center shadow-sm">
          <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-[#f0fdf4] text-[#166534]">
            <PackageOpen aria-hidden="true" size={22} />
          </div>
          <h2 className="mt-4 text-lg font-semibold text-[#102a24]">
            No equipment yet
          </h2>
          <p className="mt-1 text-sm text-[#64756b]">
            Click &ldquo;Add Service&rdquo; to list your first piece of
            equipment.
          </p>
        </div>
      ) : (
        /* Success state: shadcn table with the owner's equipments */
        <EquipmentsTable equipments={equipments} />
      )}
    </div>
  );
}
