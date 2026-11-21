import Link from "next/link";

import EquipmentGrid from "@/components/shared/EquipmentGrid";
import { getFilteredEquipments, ApiError } from "@/lib/api";
import {
  EQUIPMENT_CATEGORIES,
  RENTAL_TYPES,
} from "@/lib/validation";
import type { TEquipment } from "@/types";

type SearchParams = {
  [key: string]: string | string[] | undefined;
};

function readParam(value: string | string[] | undefined): string {
  return typeof value === "string" ? value : "";
}

export default async function AllEquipmentsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const query = await searchParams;
  const filters = {
    search: readParam(query.search),
    category: readParam(query.category),
    rentalType: readParam(query.rentalType),
    minPrice: readParam(query.minPrice),
    maxPrice: readParam(query.maxPrice),
    availability: readParam(query.availability),
    sortBy: readParam(query.sortBy) || "recent",
  };

  let equipments: TEquipment[] = [];
  let loadError: string | null = null;

  try {
    equipments = await getFilteredEquipments(filters);
  } catch (error) {
    console.error("Failed to load equipment:", error);
    loadError =
      error instanceof ApiError && error.status === 400
        ? error.message
        : "Equipment could not be loaded. Please try again.";
  }

  return (
    <main className="min-h-[60vh] bg-[#f8fbf8] px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#166534]">
            Browse the marketplace
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#102a24] sm:text-4xl">
            All Equipment
          </h1>
          <p className="mt-3 text-base leading-7 text-[#52645a]">
            Search equipment, compare rental options, and find the
            right fit for your next project.
          </p>
        </header>

        <form
          action="/equipments"
          method="get"
          className="mt-8 rounded-2xl border border-[#dce9df] bg-white p-4 shadow-sm sm:p-5"
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2 sm:col-span-2 lg:col-span-4">
              <label
                htmlFor="search"
                className="text-sm font-medium text-[#172b24]"
              >
                Search equipment name or location
              </label>
              <input
                id="search"
                name="search"
                type="search"
                defaultValue={filters.search}
                placeholder="e.g. camera or Dhaka"
                className="h-11 w-full rounded-xl border border-[#dce9df] bg-white px-3.5 text-sm text-[#172b24] placeholder:text-[#94a49a] outline-none focus-visible:border-[#166534] focus-visible:ring-2 focus-visible:ring-[#166534]/10"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="category"
                className="text-sm font-medium text-[#172b24]"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                defaultValue={filters.category}
                className="h-11 w-full rounded-xl border border-[#dce9df] bg-white px-3.5 text-sm text-[#172b24] outline-none focus-visible:border-[#166534] focus-visible:ring-2 focus-visible:ring-[#166534]/10"
              >
                <option value="">All categories</option>
                {EQUIPMENT_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="rentalType"
                className="text-sm font-medium text-[#172b24]"
              >
                Rental type
              </label>
              <select
                id="rentalType"
                name="rentalType"
                defaultValue={filters.rentalType}
                className="h-11 w-full rounded-xl border border-[#dce9df] bg-white px-3.5 text-sm text-[#172b24] outline-none focus-visible:border-[#166534] focus-visible:ring-2 focus-visible:ring-[#166534]/10"
              >
                <option value="">All rental types</option>
                {RENTAL_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="minPrice"
                className="text-sm font-medium text-[#172b24]"
              >
                Minimum price
              </label>
              <input
                id="minPrice"
                name="minPrice"
                type="number"
                min="0"
                step="any"
                defaultValue={filters.minPrice}
                placeholder="Any"
                className="h-11 w-full rounded-xl border border-[#dce9df] bg-white px-3.5 text-sm text-[#172b24] placeholder:text-[#94a49a] outline-none focus-visible:border-[#166534] focus-visible:ring-2 focus-visible:ring-[#166534]/10"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="maxPrice"
                className="text-sm font-medium text-[#172b24]"
              >
                Maximum price
              </label>
              <input
                id="maxPrice"
                name="maxPrice"
                type="number"
                min="0"
                step="any"
                defaultValue={filters.maxPrice}
                placeholder="Any"
                className="h-11 w-full rounded-xl border border-[#dce9df] bg-white px-3.5 text-sm text-[#172b24] placeholder:text-[#94a49a] outline-none focus-visible:border-[#166534] focus-visible:ring-2 focus-visible:ring-[#166534]/10"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="availability"
                className="text-sm font-medium text-[#172b24]"
              >
                Availability
              </label>
              <select
                id="availability"
                name="availability"
                defaultValue={filters.availability}
                className="h-11 w-full rounded-xl border border-[#dce9df] bg-white px-3.5 text-sm text-[#172b24] outline-none focus-visible:border-[#166534] focus-visible:ring-2 focus-visible:ring-[#166534]/10"
              >
                <option value="">All availability</option>
                <option value="available">Available</option>
                <option value="unavailable">Unavailable</option>
              </select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="sortBy"
                className="text-sm font-medium text-[#172b24]"
              >
                Sort by
              </label>
              <select
                id="sortBy"
                name="sortBy"
                defaultValue={filters.sortBy}
                className="h-11 w-full rounded-xl border border-[#dce9df] bg-white px-3.5 text-sm text-[#172b24] outline-none focus-visible:border-[#166534] focus-visible:ring-2 focus-visible:ring-[#166534]/10"
              >
                <option value="recent">Recently added</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
              </select>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Link
              href="/equipments"
              className="inline-flex h-11 items-center justify-center rounded-xl border border-[#dce9df] bg-white px-5 text-sm font-semibold text-[#52645a] hover:bg-[#f8fbf8]"
            >
              Clear filters
            </Link>
            <button
              type="submit"
              className="inline-flex h-11 items-center justify-center rounded-xl bg-[#166534] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#102a24] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#166534]"
            >
              Apply filters
            </button>
          </div>
        </form>

        <div className="mt-8 flex items-center justify-between gap-4">
          <h2 className="text-lg font-bold text-[#102a24]">
            {loadError ? "Equipment" : `${equipments.length} equipment found`}
          </h2>
          <span className="text-sm text-[#64756b]">Equipment listings</span>
        </div>

        {loadError ? (
          <p
            role="alert"
            className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700"
          >
            {loadError}
          </p>
        ) : equipments.length === 0 ? (
          <p className="mt-4 rounded-2xl border border-[#dce9df] bg-white p-10 text-center text-sm text-[#64756b]">
            No equipment matches these filters. Try changing your search or
            clearing the filters.
          </p>
        ) : (
          <div className="mt-4">
            <EquipmentGrid equipments={equipments} />
          </div>
        )}
      </div>
    </main>
  );
}
