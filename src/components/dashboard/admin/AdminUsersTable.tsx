"use client";

import { useState } from "react";
import { Check } from "lucide-react";

import { updateAdminUser } from "@/app/(dashboard)/dashboard/admin/all-users/actions";
import { Button } from "@/components/ui/button";
import { LOCATIONS, type TLocation } from "@/lib/locations";
import type { TAdminUser, TAdminUserUpdate, TUserRole } from "@/types";

const ROLES: { value: TUserRole; label: string }[] = [
  { value: "customer", label: "Customer" },
  { value: "owner", label: "Owner" },
  { value: "admin", label: "Admin" },
];

export default function AdminUsersTable({
  users,
}: {
  users: TAdminUser[];
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#dce9df] bg-white shadow-sm">
      <div className="flex items-center justify-between gap-3 border-b border-[#dce9df] bg-[#f0fdf4] px-4 py-3">
        <p className="text-sm font-semibold text-[#102a24]">
          Registered accounts
        </p>
        <p className="text-sm text-[#52645a]">
          {users.length} {users.length === 1 ? "user" : "users"}
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="bg-white text-[#102a24]">
            <tr className="border-b border-[#dce9df]">
              <th scope="col" className="px-4 py-3 font-semibold">
                Name
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                Email
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                Role
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                Location
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                Registration Date
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                Manage
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <AdminUserRow key={user.id} user={user} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AdminUserRow({ user }: { user: TAdminUser }) {
  const [role, setRole] = useState(user.role);
  const [savedRole, setSavedRole] = useState(user.role);
  const [location, setLocation] = useState<TLocation | "">(user.location ?? "");
  const [savedLocation, setSavedLocation] = useState<TLocation | "">(
    user.location ?? ""
  );
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);

  async function saveUser() {
    const updates: TAdminUserUpdate = {};
    if (role !== savedRole) updates.role = role;
    if (location !== savedLocation) {
      if (!location) {
        setHasError(true);
        setMessage("Choose a location before saving.");
        return;
      }
      updates.location = location;
    }

    if (Object.keys(updates).length === 0) return;

    setSaving(true);
    setMessage(null);

    try {
      const result = await updateAdminUser(user.id, updates);
      setMessage(result.message);
      setHasError(!result.success);
      if (result.success) {
        setSavedRole(role);
        setSavedLocation(location);
      }
    } catch (error) {
      setHasError(true);
      setMessage(
        error instanceof Error ? error.message : "Failed to update this user."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <tr className="border-b border-[#dce9df] last:border-0">
      <td className="px-4 py-4 font-medium text-[#102a24]">{user.name}</td>
      <td className="px-4 py-4 text-[#52645a]">{user.email || "—"}</td>
      <td className="px-4 py-4">
        <label className="sr-only" htmlFor={`user-role-${user.id}`}>
          Role for {user.name}
        </label>
        <select
          id={`user-role-${user.id}`}
          value={role}
          onChange={(event) => {
            setRole(event.target.value as TUserRole);
            setMessage(null);
          }}
          disabled={saving}
          className="h-9 min-w-32 rounded-lg border border-[#dce9df] bg-white px-3 text-sm text-[#102a24] outline-none focus-visible:ring-2 focus-visible:ring-[#166534] disabled:opacity-60"
        >
          {ROLES.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </td>
      <td className="px-4 py-4">
        <label className="sr-only" htmlFor={`user-location-${user.id}`}>
          Location for {user.name}
        </label>
        <select
          id={`user-location-${user.id}`}
          value={location}
          onChange={(event) => {
            setLocation(event.target.value as TLocation | "");
            setMessage(null);
          }}
          disabled={saving}
          className="h-9 min-w-40 rounded-lg border border-[#dce9df] bg-white px-3 text-sm text-[#102a24] outline-none focus-visible:ring-2 focus-visible:ring-[#166534] disabled:opacity-60"
        >
          <option value="">Select location</option>
          {LOCATIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </td>
      <td className="whitespace-nowrap px-4 py-4 text-[#52645a]">
        {formatDate(user.createdAt)}
      </td>
      <td className="px-4 py-4">
        <Button
          type="button"
          onClick={saveUser}
          disabled={
            saving ||
            (role === savedRole && location === savedLocation)
          }
          className="bg-[#166534] text-white hover:bg-[#102a24]"
        >
          <Check aria-hidden="true" />
          {saving ? "Saving..." : "Save"}
        </Button>
        {message && (
          <p
            role={hasError ? "alert" : "status"}
            className={`mt-2 max-w-48 text-xs ${
              hasError ? "text-red-600" : "text-[#166534]"
            }`}
          >
            {message}
          </p>
        )}
      </td>
    </tr>
  );
}

function formatDate(value: string | null): string {
  if (!value) return "—";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";

  return new Intl.DateTimeFormat("en-BD", { dateStyle: "medium" }).format(date);
}
