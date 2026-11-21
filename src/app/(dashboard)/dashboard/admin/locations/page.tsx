import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import OwnerLocationTable from "@/components/dashboard/admin/OwnerLocationTable";
import { auth, db, type TAuthUserRecord } from "@/lib/auth";
import { LOCATIONS } from "@/lib/locations";

type OwnerLocation = {
  id: string;
  name: string;
  email: string;
  location: (typeof LOCATIONS)[number] | null;
};

export default async function AdminLocationsPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    redirect("/signin");
  }

  if (session.user.role !== "admin") {
    redirect(`/dashboard/${session.user.role ?? "customer"}`);
  }

  let owners: OwnerLocation[] = [];
  let loadError: string | null = null;

  try {
    const ownerDocuments = await db
      .collection<TAuthUserRecord>("user")
      .find(
        { role: "owner" },
        { projection: { name: 1, email: 1, location: 1 } }
      )
      .sort({ name: 1 })
      .toArray();

    owners = ownerDocuments.map((owner) => ({
      id: String(owner._id),
      name: typeof owner.name === "string" ? owner.name : "Equiply owner",
      email: typeof owner.email === "string" ? owner.email : "",
      location:
        LOCATIONS.find((location) => location === owner.location) ?? null,
    }));
  } catch (error) {
    loadError =
      error instanceof Error ? error.message : "Failed to load owner locations.";
  }

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 p-4 sm:p-6">
      <header>
        <p className="text-sm font-semibold text-[#166534]">Administration</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#102a24]">
          Owner locations
        </h1>
        <p className="mt-1 text-sm text-[#64756b]">
          Assign or update the location associated with each equipment owner.
        </p>
      </header>

      {loadError ? (
        <section
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-6"
        >
          <h2 className="font-semibold text-red-700">
            Could not load owner locations
          </h2>
          <p className="mt-1 text-sm text-red-600">{loadError}</p>
          <Link
            href="/dashboard/admin/locations"
            className="mt-4 inline-block rounded-xl border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-100"
          >
            Try again
          </Link>
        </section>
      ) : owners.length === 0 ? (
        <section className="rounded-xl border border-[#dce9df] bg-white p-10 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-[#102a24]">
            No equipment owners yet
          </h2>
          <p className="mt-1 text-sm text-[#64756b]">
            Owner accounts will appear here when they register.
          </p>
        </section>
      ) : (
        <OwnerLocationTable owners={owners} />
      )}
    </main>
  );
}
