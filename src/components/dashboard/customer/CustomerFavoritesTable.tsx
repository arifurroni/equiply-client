"use client";

import { useState } from "react";
import Link from "next/link";
import { Trash2 } from "lucide-react";

import { removeCustomerFavorite } from "@/app/(dashboard)/dashboard/customer/favorites/actions";
import { Button } from "@/components/ui/button";
import type { TEquipment } from "@/types";

export default function CustomerFavoritesTable({
  favorites: initialFavorites,
}: {
  favorites: TEquipment[];
}) {
  const [favorites, setFavorites] = useState(initialFavorites);

  function removeFavoriteFromList(equipmentId: string) {
    setFavorites((current) =>
      current.filter((equipment) => equipment._id !== equipmentId)
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-[#dce9df] bg-white shadow-sm">
      <div className="flex items-center justify-between gap-3 border-b border-[#dce9df] bg-[#f0fdf4] px-4 py-3">
        <p className="text-sm font-semibold text-[#102a24]">
          Saved equipment
        </p>
        <p className="text-sm text-[#52645a]">
          {favorites.length} {favorites.length === 1 ? "item" : "items"}
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-190 text-left text-sm">
          <thead className="text-[#102a24]">
            <tr className="border-b border-[#dce9df]">
              <th scope="col" className="px-4 py-3 font-semibold">
                Equipment
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                Category
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                Location
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                Rental Price
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {favorites.map((equipment) => (
              <FavoriteRow
                key={equipment._id}
                equipment={equipment}
                onRemove={removeFavoriteFromList}
              />
            ))}
          </tbody>
        </table>
      </div>

      {favorites.length === 0 && (
        <p className="p-8 text-center text-sm text-[#64756b]">
          You have no saved equipment. Browse the marketplace to find something
          you like.
        </p>
      )}
    </div>
  );
}

function FavoriteRow({
  equipment,
  onRemove,
}: {
  equipment: TEquipment;
  onRemove: (equipmentId: string) => void;
}) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function removeFavorite() {
    setSaving(true);
    setError(null);

    try {
      await removeCustomerFavorite(equipment._id);
      onRemove(equipment._id);
    } catch (removeError) {
      setError(
        removeError instanceof Error
          ? removeError.message
          : "Could not remove this favorite."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <tr className="border-b border-[#dce9df] last:border-0">
      <td className="px-4 py-4">
        <p className="font-semibold text-[#102a24]">{equipment.name}</p>
        <p className="text-xs text-[#64756b]">
          {[equipment.brand, equipment.model].filter(Boolean).join(" ") || "—"}
        </p>
      </td>
      <td className="px-4 py-4 text-[#52645a]">{equipment.category}</td>
      <td className="px-4 py-4 text-[#52645a]">{equipment.location}</td>
      <td className="whitespace-nowrap px-4 py-4 font-medium text-[#166534]">
        ${equipment.rentalPrice} / {equipment.rentalType}
      </td>
      <td className="px-4 py-4">
        <div className="flex gap-2">
          <Link
            href={`/equipments/${equipment._id}`}
            className="inline-flex h-10 items-center justify-center rounded-xl bg-[#166534] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#102a24]"
          >
            View Details
          </Link>
          {/* <Button
            render={<Link href={`/equipments/${equipment._id}`} />}
            className="bg-[#166534] text-white hover:bg-[#102a24]"
          >
            View Details
          </Button> */}
          <Button
            type="button"
            variant="outline"
            onClick={removeFavorite}
            disabled={saving}
            aria-label={`Remove ${equipment.name} from favorites`}
            className="border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800"
          >
            <Trash2 aria-hidden="true" />
            {saving ? "Removing..." : "Remove"}
          </Button>
        </div>
        {error && (
          <p role="alert" className="mt-2 text-xs text-red-600">
            {error}
          </p>
        )}
      </td>
    </tr>
  );
}
