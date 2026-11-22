"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { Check, Pencil, Trash2, X } from "lucide-react";

import {
  deleteAdminEquipment,
  setEquipmentApprovalStatus,
  updateAdminEquipment,
} from "@/app/(dashboard)/dashboard/admin/all-equipments/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  EQUIPMENT_CATEGORIES,
  EQUIPMENT_CONDITIONS,
  EQUIPMENT_STATUSES,
  RENTAL_TYPES,
} from "@/lib/validation";
import type {
  TAdminEquipment,
  TAdminEquipmentUpdate,
  TEquipmentApprovalStatus,
  TEquipmentCondition,
  TRentalType,
  TEquipmentStatus,
} from "@/types";

const primaryButtonClass =
  "rounded-lg bg-[#166534] text-white hover:bg-[#102a24]";
const inputClass =
  "h-10 w-full rounded-lg border-[#dce9df] bg-white text-sm text-[#172b24] focus-visible:border-[#166534] focus-visible:ring-[#166534]/10";
const selectClass =
  "h-10 w-full rounded-lg border border-[#dce9df] bg-white px-3 text-sm text-[#172b24] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#166534]/10";

export default function AdminEquipmentsTable({
  equipments: initialEquipments,
}: {
  equipments: TAdminEquipment[];
}) {
  const [equipments, setEquipments] = useState(initialEquipments);

  function updateEquipment(
    id: string,
    updates: Partial<TAdminEquipment>
  ) {
    setEquipments((current) =>
      current.map((equipment) =>
        equipment._id === id ? { ...equipment, ...updates } : equipment
      )
    );
  }

  function removeEquipment(id: string) {
    setEquipments((current) =>
      current.filter((equipment) => equipment._id !== id)
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-[#dce9df] bg-white shadow-sm">
      <div className="flex items-center justify-between gap-3 border-b border-[#dce9df] bg-[#f0fdf4] px-4 py-3">
        <p className="text-sm font-semibold text-[#102a24]">
          Equipment listings
        </p>
        <p className="text-sm text-[#52645a]">
          {equipments.length}{" "}
          {equipments.length === 1 ? "equipment item" : "equipment items"}
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-280 text-left text-sm">
          <thead className="bg-white text-[#102a24]">
            <tr className="border-b border-[#dce9df]">
              <th scope="col" className="px-4 py-3 font-semibold">
                Equipment
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                Category
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                Owner
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                Location
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                Rental Price
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                Availability
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                Status
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {equipments.map((equipment) => (
              <AdminEquipmentRow
                key={equipment._id}
                equipment={equipment}
                onUpdate={updateEquipment}
                onDelete={removeEquipment}
              />
            ))}
          </tbody>
        </table>
      </div>

      {equipments.length === 0 && (
        <p className="p-8 text-center text-sm text-[#64756b]">
          All equipment listings have been removed.
        </p>
      )}
    </div>
  );
}

function AdminEquipmentRow({
  equipment: initialEquipment,
  onUpdate,
  onDelete,
}: {
  equipment: TAdminEquipment;
  onUpdate: (id: string, updates: Partial<TAdminEquipment>) => void;
  onDelete: (id: string) => void;
}) {
  const [equipment, setEquipment] = useState(initialEquipment);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);

  async function changeApprovalStatus(status: TEquipmentApprovalStatus) {
    setBusy(true);
    setMessage(null);
    setHasError(false);

    try {
      await setEquipmentApprovalStatus(equipment._id, status);
      setEquipment((current) => ({ ...current, approvalStatus: status }));
      onUpdate(equipment._id, { approvalStatus: status });
      setMessage(`Equipment ${status}.`);
    } catch (error) {
      setHasError(true);
      setMessage(
        error instanceof Error ? error.message : "Could not update status."
      );
    } finally {
      setBusy(false);
    }
  }

  async function removeEquipment() {
    if (
      !window.confirm(
        `Delete "${equipment.name}"? This action cannot be undone.`
      )
    ) {
      return;
    }

    setBusy(true);
    setMessage(null);

    try {
      await deleteAdminEquipment(equipment._id);
      onDelete(equipment._id);
    } catch (error) {
      setHasError(true);
      setMessage(
        error instanceof Error ? error.message : "Could not delete equipment."
      );
    } finally {
      setBusy(false);
    }
  }

  function handleUpdate(updates: TAdminEquipmentUpdate) {
    setEquipment((current) => ({ ...current, ...updates }));
    onUpdate(equipment._id, updates);
    setMessage("Equipment updated successfully.");
    setHasError(false);
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
      <td className="px-4 py-4 text-[#52645a]">{equipment.ownerId}</td>
      <td className="px-4 py-4 text-[#52645a]">{equipment.location}</td>
      <td className="whitespace-nowrap px-4 py-4 font-medium text-[#166534]">
        ${equipment.rentalPrice} / {equipment.rentalType}
      </td>
      <td className="px-4 py-4 text-[#52645a]">
        {equipment.status === "active" ? "Available" : "Unavailable"}
      </td>
      <td className="px-4 py-4">
        <ApprovalBadge status={equipment.approvalStatus} />
      </td>
      <td className="px-4 py-4">
        <div className="flex min-w-90 flex-wrap gap-2">
          <Button
            type="button"
            size="sm"
            onClick={() => changeApprovalStatus("approved")}
            disabled={busy || equipment.approvalStatus === "approved"}
            className={primaryButtonClass}
          >
            <Check aria-hidden="true" />
            Approve
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => changeApprovalStatus("rejected")}
            disabled={busy || equipment.approvalStatus === "rejected"}
            className="border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800"
          >
            <X aria-hidden="true" />
            Reject
          </Button>
          <AdminEquipmentEditor
            equipment={equipment}
            disabled={busy}
            onSavingChange={setBusy}
            onSaved={handleUpdate}
            onMessage={setMessage}
            onError={setHasError}
          />
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={removeEquipment}
            disabled={busy}
            className="border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800"
          >
            <Trash2 aria-hidden="true" />
            Delete
          </Button>
        </div>
        {message && (
          <p
            role={hasError ? "alert" : "status"}
            className={`mt-2 text-xs ${
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

function ApprovalBadge({ status }: { status: TEquipmentApprovalStatus }) {
  const styles: Record<TEquipmentApprovalStatus, string> = {
    pending: "border-amber-200 bg-amber-50 text-amber-800",
    approved: "border-[#dce9df] bg-[#f0fdf4] text-[#166534]",
    rejected: "border-red-200 bg-red-50 text-red-700",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium capitalize ${styles[status]}`}
    >
      {status}
    </span>
  );
}

function AdminEquipmentEditor({
  equipment,
  disabled,
  onSavingChange,
  onSaved,
  onMessage,
  onError,
}: {
  equipment: TAdminEquipment;
  disabled: boolean;
  onSavingChange: (saving: boolean) => void;
  onSaved: (updates: TAdminEquipmentUpdate) => void;
  onMessage: (message: string | null) => void;
  onError: (hasError: boolean) => void;
}) {
  const [open, setOpen] = useState(false);

  async function submitUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const updates: TAdminEquipmentUpdate = {
      name: String(formData.get("name") ?? "").trim(),
      description: String(formData.get("description") ?? "").trim(),
      category: String(formData.get("category") ?? ""),
      location: String(formData.get("location") ?? "").trim(),
      rentalPrice: Number(formData.get("rentalPrice")),
      rentalType: String(formData.get("rentalType") ?? "") as TRentalType,
      availableQuantity: Number(formData.get("availableQuantity")),
      condition: String(formData.get("condition") ?? "") as TEquipmentCondition,
      brand: String(formData.get("brand") ?? "").trim(),
      model: String(formData.get("model") ?? "").trim(),
      image: String(formData.get("image") ?? "").trim(),
      rentalTerms: String(formData.get("rentalTerms") ?? "").trim(),
      status: String(formData.get("status") ?? "") as TEquipmentStatus,
    };

    onSavingChange(true);
    onMessage(null);
    onError(false);

    try {
      await updateAdminEquipment(equipment._id, updates);
      onSaved(updates);
      setOpen(false);
    } catch (error) {
      onError(true);
      onMessage(
        error instanceof Error ? error.message : "Could not update equipment."
      );
    } finally {
      onSavingChange(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            type="button"
            size="sm"
            variant="outline"
            disabled={disabled}
            className="border-[#dce9df] text-[#102a24] hover:bg-[#f0fdf4]"
          />
        }
      >
        <Pencil aria-hidden="true" />
        Update
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-[#102a24]">
            Update equipment
          </DialogTitle>
          <DialogDescription>
            Edit the listing details for {equipment.name}.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={submitUpdate} className="space-y-5">
          <fieldset
            disabled={disabled}
            className="grid gap-4 sm:grid-cols-2"
          >
            <EditorField
              label="Equipment name"
              id={`equipment-name-${equipment._id}`}
              required
            >
              <Input
                id={`equipment-name-${equipment._id}`}
                name="name"
                defaultValue={equipment.name}
                minLength={2}
                maxLength={120}
                required
                className={inputClass}
              />
            </EditorField>
            <EditorField
              label="Category"
              id={`equipment-category-${equipment._id}`}
              required
            >
              <select
                id={`equipment-category-${equipment._id}`}
                name="category"
                defaultValue={equipment.category}
                required
                className={selectClass}
              >
                {!EQUIPMENT_CATEGORIES.includes(
                  equipment.category as (typeof EQUIPMENT_CATEGORIES)[number]
                ) && <option value={equipment.category}>{equipment.category}</option>}
                {EQUIPMENT_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </EditorField>
            <EditorField
              label="Location"
              id={`equipment-location-${equipment._id}`}
              required
            >
              <Input
                id={`equipment-location-${equipment._id}`}
                name="location"
                defaultValue={equipment.location}
                minLength={2}
                maxLength={120}
                required
                className={inputClass}
              />
            </EditorField>
            <EditorField
              label="Rental price"
              id={`equipment-price-${equipment._id}`}
              required
            >
              <Input
                id={`equipment-price-${equipment._id}`}
                name="rentalPrice"
                type="number"
                min={1}
                step="any"
                defaultValue={equipment.rentalPrice}
                required
                className={inputClass}
              />
            </EditorField>
            <EditorField
              label="Rental type"
              id={`equipment-rental-type-${equipment._id}`}
              required
            >
              <select
                id={`equipment-rental-type-${equipment._id}`}
                name="rentalType"
                defaultValue={equipment.rentalType}
                required
                className={selectClass}
              >
                {RENTAL_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </EditorField>
            <EditorField
              label="Available quantity"
              id={`equipment-quantity-${equipment._id}`}
              required
            >
              <Input
                id={`equipment-quantity-${equipment._id}`}
                name="availableQuantity"
                type="number"
                min={1}
                step={1}
                defaultValue={equipment.availableQuantity}
                required
                className={inputClass}
              />
            </EditorField>
            <EditorField
              label="Condition"
              id={`equipment-condition-${equipment._id}`}
              required
            >
              <select
                id={`equipment-condition-${equipment._id}`}
                name="condition"
                defaultValue={equipment.condition}
                required
                className={selectClass}
              >
                {EQUIPMENT_CONDITIONS.map((condition) => (
                  <option key={condition} value={condition}>
                    {condition
                      .split("-")
                      .map(
                        (part) => part.charAt(0).toUpperCase() + part.slice(1)
                      )
                      .join(" ")}
                  </option>
                ))}
              </select>
            </EditorField>
            <EditorField
              label="Brand"
              id={`equipment-brand-${equipment._id}`}
              required
            >
              <Input
                id={`equipment-brand-${equipment._id}`}
                name="brand"
                defaultValue={equipment.brand}
                maxLength={100}
                required
                className={inputClass}
              />
            </EditorField>
            <EditorField
              label="Model"
              id={`equipment-model-${equipment._id}`}
              required
            >
              <Input
                id={`equipment-model-${equipment._id}`}
                name="model"
                defaultValue={equipment.model}
                maxLength={100}
                required
                className={inputClass}
              />
            </EditorField>
            <EditorField
              label="Availability"
              id={`equipment-status-${equipment._id}`}
              required
            >
              <select
                id={`equipment-status-${equipment._id}`}
                name="status"
                defaultValue={equipment.status}
                required
                className={selectClass}
              >
                {EQUIPMENT_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </EditorField>
            <EditorField
              label="Image URL"
              id={`equipment-image-${equipment._id}`}
              required
              className="sm:col-span-2"
            >
              <Input
                id={`equipment-image-${equipment._id}`}
                name="image"
                type="url"
                defaultValue={equipment.image}
                required
                className={inputClass}
              />
            </EditorField>
            <EditorField
              label="Description"
              id={`equipment-description-${equipment._id}`}
              required
              className="sm:col-span-2"
            >
              <Textarea
                id={`equipment-description-${equipment._id}`}
                name="description"
                defaultValue={equipment.description}
                minLength={10}
                maxLength={5000}
                required
                className="min-h-24 border-[#dce9df] bg-white text-sm focus-visible:border-[#166534] focus-visible:ring-[#166534]/10"
              />
            </EditorField>
            <EditorField
              label="Rental terms and conditions"
              id={`equipment-terms-${equipment._id}`}
              required
              className="sm:col-span-2"
            >
              <Textarea
                id={`equipment-terms-${equipment._id}`}
                name="rentalTerms"
                defaultValue={equipment.rentalTerms}
                minLength={10}
                maxLength={5000}
                required
                className="min-h-24 border-[#dce9df] bg-white text-sm focus-visible:border-[#166534] focus-visible:ring-[#166534]/10"
              />
            </EditorField>
          </fieldset>

          <DialogFooter>
            <DialogClose
              render={
                <Button
                  type="button"
                  variant="outline"
                  disabled={disabled}
                  className="border-[#dce9df] text-[#102a24]"
                />
              }
            >
              Cancel
            </DialogClose>
            <Button type="submit" disabled={disabled} className={primaryButtonClass}>
              {disabled ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function EditorField({
  label,
  id,
  required,
  className,
  children,
}: {
  label: string;
  id: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`space-y-2 ${className ?? ""}`}>
      <Label htmlFor={id} className="text-sm font-medium text-[#172b24]">
        {label}
        {required && <span className="sr-only"> required</span>}
      </Label>
      {children}
    </div>
  );
}
