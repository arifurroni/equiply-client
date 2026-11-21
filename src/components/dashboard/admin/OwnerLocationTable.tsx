"use client";

import { useState } from "react";
import { Check, MapPin } from "lucide-react";

import { updateOwnerLocation } from "@/app/(dashboard)/dashboard/admin/locations/actions";
import { Button } from "@/components/ui/button";
import { LOCATIONS, type TLocation } from "@/lib/locations";

type OwnerLocation = {
  id: string;
  name: string;
  email: string;
  location: TLocation | null;
};

export default function OwnerLocationTable({
  owners,
}: {
  owners: OwnerLocation[];
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#dce9df] bg-white shadow-sm">
      <div className="flex items-center gap-2 border-b border-[#dce9df] bg-[#f0fdf4] px-4 py-3">
        <MapPin aria-hidden="true" size={18} className="text-[#166534]" />
        <p className="text-sm font-semibold text-[#102a24]">
          {owners.length} {owners.length === 1 ? "owner" : "owners"}
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-160 text-left text-sm">
          <thead className="bg-white text-[#102a24]">
            <tr className="border-b border-[#dce9df]">
              <th scope="col" className="px-4 py-3 font-semibold">
                Owner
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                Email
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                Location
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {owners.map((owner) => (
              <OwnerLocationRow key={owner.id} owner={owner} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function OwnerLocationRow({ owner }: { owner: OwnerLocation }) {
  const [location, setLocation] = useState(owner.location ?? "");
  const [savedLocation, setSavedLocation] = useState(owner.location ?? "");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState(false);

  async function saveLocation() {
    setSaving(true);
    setMessage(null);

    try {
      const result = await updateOwnerLocation(owner.id, location);
      setMessage(result.message);
      setError(!result.success);
      if (result.success) {
        setSavedLocation(location);
      }
    } catch (saveError) {
      setError(true);
      setMessage(
        saveError instanceof Error
          ? saveError.message
          : "Failed to update the owner location."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <tr className="border-b border-[#dce9df] last:border-0">
      <td className="px-4 py-4 font-medium text-[#102a24]">{owner.name}</td>
      <td className="px-4 py-4 text-[#52645a]">{owner.email || "—"}</td>
      <td className="px-4 py-4">
        <label className="sr-only" htmlFor={`owner-location-${owner.id}`}>
          Location for {owner.name}
        </label>
        <select
          id={`owner-location-${owner.id}`}
          value={location}
          onChange={(event) => {
            setLocation(event.target.value);
            setMessage(null);
          }}
          disabled={saving}
          className="h-9 min-w-40 rounded-lg border border-[#dce9df] bg-white px-3 text-sm text-[#102a24] outline-none focus-visible:ring-2 focus-visible:ring-[#166534] disabled:opacity-60"
        >
          <option value="">Unassigned</option>
          {LOCATIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </td>
      <td className="px-4 py-4">
        <Button
          type="button"
          onClick={saveLocation}
          disabled={saving || location === savedLocation}
          className="bg-[#166534] text-white hover:bg-[#102a24]"
        >
          <Check aria-hidden="true" />
          {saving ? "Saving..." : "Save"}
        </Button>
        {message && (
          <p
            role={error ? "alert" : "status"}
            className={`mt-2 max-w-48 text-xs ${
              error ? "text-red-600" : "text-[#166534]"
            }`}
          >
            {message}
          </p>
        )}
      </td>
    </tr>
  );
}
