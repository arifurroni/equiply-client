import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import CustomerFavoritesTable from "@/components/dashboard/customer/CustomerFavoritesTable";
import { auth } from "@/lib/auth";
import type { TEquipment } from "@/types";
import { getCustomerFavorites } from "./actions";

export default async function CustomerFavoritesPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    redirect("/signin");
  }

  if (session.user.role !== "customer") {
    redirect(`/dashboard/${session.user.role ?? "customer"}`);
  }

  let favorites: TEquipment[] = [];
  let loadError: string | null = null;

  try {
    favorites = await getCustomerFavorites();
  } catch (error) {
    loadError =
      error instanceof Error ? error.message : "Failed to load your favorites.";
  }

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 p-4 sm:p-6">
      <header>
        <p className="text-sm font-semibold text-[#166534]">Customer dashboard</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#102a24]">
          Favorites
        </h1>
        <p className="mt-1 text-sm text-[#64756b]">
          Keep track of equipment you may want to rent.
        </p>
      </header>

      {loadError ? (
        <section
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-6"
        >
          <h2 className="font-semibold text-red-700">
            Could not load your favorites
          </h2>
          <p className="mt-1 text-sm text-red-600">{loadError}</p>
          <Link
            href="/dashboard/customer/favorites"
            className="mt-4 inline-block rounded-xl border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-100"
          >
            Try again
          </Link>
        </section>
      ) : (
        <CustomerFavoritesTable favorites={favorites} />
      )}
    </main>
  );
}