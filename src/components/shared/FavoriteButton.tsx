"use client";

import { useState } from "react";
import { Heart } from "lucide-react";

import {
  addCustomerFavorite,
  getCustomerFavoriteStatus,
  removeCustomerFavorite,
} from "@/app/(dashboard)/dashboard/customer/favorites/actions";
import { Button } from "@/components/ui/button";

export default function FavoriteButton({
  equipmentId,
  initialIsFavorite,
  initialError = null,
}: {
  equipmentId: string;
  initialIsFavorite: boolean;
  initialError?: string | null;
}) {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statusError, setStatusError] = useState(initialError);

  async function toggleFavorite() {
    setSaving(true);
    setError(null);

    try {
      if (statusError) {
        setIsFavorite(await getCustomerFavoriteStatus(equipmentId));
        setStatusError(null);
        return;
      }

      if (isFavorite) {
        await removeCustomerFavorite(equipmentId);
        setIsFavorite(false);
      } else {
        await addCustomerFavorite(equipmentId);
        setIsFavorite(true);
      }
    } catch (saveError) {
      const message =
        saveError instanceof Error
          ? saveError.message
          : "Could not update your favorites.";
      if (statusError) {
        setStatusError(message);
      } else {
        setError(message);
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <Button
        type="button"
        variant="outline"
        onClick={toggleFavorite}
        disabled={saving}
        aria-pressed={isFavorite}
        className="h-11 rounded-xl border-[#dce9df] px-4 text-[#166534] hover:bg-[#f0fdf4]"
      >
        <Heart
          aria-hidden="true"
          className={isFavorite ? "fill-current" : ""}
        />
        {saving
          ? statusError
            ? "Checking..."
            : "Saving..."
          : statusError
            ? "Retry Favorite Status"
          : isFavorite
            ? "Remove from Favorites"
            : "Add to Favorites"}
      </Button>
      {(statusError || error) && (
        <p role="alert" className="mt-2 text-sm text-red-600">
          {statusError || error}
        </p>
      )}
    </div>
  );
}
