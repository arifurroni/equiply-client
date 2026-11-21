"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, Plus } from "lucide-react";

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/toast";
import { createEquipment } from "@/lib/action";
import {
  EQUIPMENT_CATEGORIES,
  EQUIPMENT_CONDITIONS,
  EQUIPMENT_STATUSES,
  RENTAL_TYPES,
  equipmentSchema,
  type EquipmentFormInput,
  type EquipmentFormValues,
} from "@/lib/validation";

// ---------- Styles (same palette as the rest of the app) ----------

const inputClass =
  "h-11 w-full rounded-xl border-[#dce9df] bg-white px-3.5 text-sm text-[#172b24] placeholder:text-[#94a49a] focus-visible:border-[#166534] focus-visible:ring-[#166534]/10";

const textareaClass =
  "min-h-24 w-full rounded-xl border-[#dce9df] bg-white px-3.5 py-2.5 text-sm text-[#172b24] placeholder:text-[#94a49a] focus-visible:border-[#166534] focus-visible:ring-[#166534]/10";

const selectClass =
  "h-11 w-full rounded-xl border-[#dce9df] bg-white px-3.5 text-sm text-[#172b24] focus-visible:border-[#166534] focus-visible:ring-[#166534]/10 data-placeholder:text-[#94a49a]";

const labelClass = "text-sm font-medium text-[#172b24]";

const primaryButtonClass =
  "h-11 rounded-xl bg-[#166534] px-5 text-sm font-semibold text-white hover:bg-[#102a24]";

// ---------- Display labels ----------

const conditionLabels: Record<string, string> = {
  new: "New",
  "like-new": "Like New",
  good: "Good",
  fair: "Fair",
  poor: "Poor",
};

const rentalTypeLabels: Record<string, string> = {
  daily: "Daily",
  weekly: "Weekly",
  monthly: "Monthly",
};

const statusLabels: Record<string, string> = {
  active: "Active",
  inactive: "Inactive",
};

// ---------- Small helpers ----------

function FieldError({ message }: { message?: unknown }) {
  if (typeof message !== "string" || message.length === 0) return null;
  return <p className="text-xs font-medium text-red-600">{message}</p>;
}

function firstFile(value: unknown): File | null {
  if (value instanceof File) return value;
  if (
    typeof FileList !== "undefined" &&
    value instanceof FileList &&
    value.length > 0
  ) {
    return value[0];
  }
  return null;
}

export default function AddService() {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EquipmentFormInput, unknown, EquipmentFormValues>({
    resolver: zodResolver(equipmentSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      location: "",
      rentalType: "" as unknown as EquipmentFormValues["rentalType"],
      condition: "",
      brand: "",
      model: "",
      rentalTerms: "",
      status: "",
    },
  });

  async function onSubmit(values: EquipmentFormValues) {
    // React Hook Form stores file inputs as a FileList — normalize to a File.
    const imageFile = firstFile(values.image);

    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (key === "image") return;
      if (value === undefined || value === null) return;
      formData.append(key, String(value));
    });

    if (imageFile) formData.append("image", imageFile);

    // Server action: verifies session, re-validates, uploads image, calls API.
    const state = await createEquipment(formData);

    if (state.success) {
      toast.add({
        type: "success",
        title: "Equipment added",
        description: state.message,
      });
      reset();
      setOpen(false);
    } else {
      toast.add({
        type: "error",
        title: "Could not add equipment",
        description: state.message,
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* ---------- "Add Service" button (top of the page) ---------- */}
      <DialogTrigger
        render={<Button className={primaryButtonClass} />}
      >
        <Plus aria-hidden="true" size={18} />
        Add Service
      </DialogTrigger>

      {/* ---------- Modal ---------- */}
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-[#102a24]">
            Add a new service
          </DialogTitle>
          <DialogDescription>
            Fill in the details of the equipment you want to rent out.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-5"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Equipment Name */}
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="name" className={labelClass}>
                Equipment Name
              </Label>
              <Input
                id="name"
                placeholder="e.g. Bosch Hammer Drill"
                disabled={isSubmitting}
                className={inputClass}
                {...register("name")}
              />
              <FieldError message={errors.name?.message} />
            </div>

            {/* Description */}
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="description" className={labelClass}>
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Describe the equipment, what it is best used for, what is included..."
                disabled={isSubmitting}
                className={textareaClass}
                {...register("description")}
              />
              <FieldError message={errors.description?.message} />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category" className={labelClass}>
                Category
              </Label>
              <Controller
                control={control}
                name="category"
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger id="category" className={selectClass}>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {EQUIPMENT_CATEGORIES.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldError message={errors.category?.message} />
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location" className={labelClass}>
                Location
              </Label>
              <Input
                id="location"
                placeholder="e.g. Dhaka"
                disabled={isSubmitting}
                className={inputClass}
                {...register("location")}
              />
              <FieldError message={errors.location?.message} />
            </div>

            {/* Rental Price */}
            <div className="space-y-2">
              <Label htmlFor="rentalPrice" className={labelClass}>
                Rental Price ($)
              </Label>
              <Input
                id="rentalPrice"
                type="number"
                min={1}
                step="any"
                placeholder="e.g. 25"
                disabled={isSubmitting}
                className={inputClass}
                {...register("rentalPrice")}
              />
              <FieldError message={errors.rentalPrice?.message} />
            </div>

            {/* Rental Type */}
            <div className="space-y-2">
              <Label htmlFor="rentalType" className={labelClass}>
                Rental Type
              </Label>
              <Controller
                control={control}
                name="rentalType"
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger id="rentalType" className={selectClass}>
                      <SelectValue placeholder="Select rental type" />
                    </SelectTrigger>
                    <SelectContent>
                      {RENTAL_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {rentalTypeLabels[type] ?? type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldError message={errors.rentalType?.message} />
            </div>

            {/* Available Quantity */}
            <div className="space-y-2">
              <Label htmlFor="availableQuantity" className={labelClass}>
                Available Quantity
              </Label>
              <Input
                id="availableQuantity"
                type="number"
                min={1}
                step={1}
                placeholder="e.g. 5"
                disabled={isSubmitting}
                className={inputClass}
                {...register("availableQuantity")}
              />
              <FieldError message={errors.availableQuantity?.message} />
            </div>

            {/* Condition */}
            <div className="space-y-2">
              <Label htmlFor="condition" className={labelClass}>
                Condition
              </Label>
              <Controller
                control={control}
                name="condition"
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger id="condition" className={selectClass}>
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      {EQUIPMENT_CONDITIONS.map((condition) => (
                        <SelectItem key={condition} value={condition}>
                          {conditionLabels[condition] ?? condition}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldError message={errors.condition?.message} />
            </div>

            {/* Brand */}
            <div className="space-y-2">
              <Label htmlFor="brand" className={labelClass}>
                Brand
              </Label>
              <Input
                id="brand"
                placeholder="e.g. Bosch"
                disabled={isSubmitting}
                className={inputClass}
                {...register("brand")}
              />
              <FieldError message={errors.brand?.message} />
            </div>

            {/* Model */}
            <div className="space-y-2">
              <Label htmlFor="model" className={labelClass}>
                Model
              </Label>
              <Input
                id="model"
                placeholder="e.g. GSB 16 RE"
                disabled={isSubmitting}
                className={inputClass}
                {...register("model")}
              />
              <FieldError message={errors.model?.message} />
            </div>

            {/* Equipment Image */}
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="image" className={labelClass}>
                Equipment Image
              </Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                disabled={isSubmitting}
                className={`${inputClass} file:mr-3 file:cursor-pointer file:rounded-lg file:border-0 file:bg-[#f0fdf4] file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-[#166534]`}
                {...register("image")}
              />
              <p className="text-xs text-[#64756b]">
                JPG or PNG, up to 5MB. The image is uploaded to imgbb.
              </p>
              <FieldError message={errors.image?.message} />
            </div>

            {/* Rental Terms */}
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="rentalTerms" className={labelClass}>
                Rental Terms and Conditions
              </Label>
              <Textarea
                id="rentalTerms"
                placeholder="e.g. Deposit required, damage responsibility, late return fees..."
                disabled={isSubmitting}
                className={textareaClass}
                {...register("rentalTerms")}
              />
              <FieldError message={errors.rentalTerms?.message} />
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label htmlFor="status" className={labelClass}>
                Status
              </Label>
              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger id="status" className={selectClass}>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {EQUIPMENT_STATUSES.map((status) => (
                        <SelectItem key={status} value={status}>
                          {statusLabels[status] ?? status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldError message={errors.status?.message} />
            </div>
          </div>

          {/* ---------- Footer ---------- */}
          <DialogFooter>
            <DialogClose
              render={
                <Button
                  type="button"
                  variant="outline"
                  className="h-11 rounded-xl border-[#dce9df] px-5 text-sm font-semibold text-[#102a24] hover:bg-[#f0fdf4] hover:text-[#166534]"
                />
              }
            >
              Cancel
            </DialogClose>

            <Button
              type="submit"
              disabled={isSubmitting}
              className={primaryButtonClass}
            >
              {isSubmitting ? (
                <>
                  <LoaderCircle
                    aria-hidden="true"
                    size={16}
                    className="animate-spin"
                  />
                  Adding...
                </>
              ) : (
                "Add Equipment"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
