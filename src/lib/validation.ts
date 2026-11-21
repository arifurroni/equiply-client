import { z } from "zod";

/**
 * Shared constants + Zod schema for the equipment form.
 * The SAME schema validates on the client (React Hook Form)
 * and again inside the server action — rule: validate on both sides.
 */

export const EQUIPMENT_CATEGORIES = [
  "Construction",
  "Power Tools",
  "Garden & Outdoor",
  "Cleaning",
  "Audio & Video",
  "Events & Party",
  "Furniture",
  "Vehicles",
  "IT & Electronics",
  "Sports",
  "Other",
] as const;

export const RENTAL_TYPES = ["daily", "weekly", "monthly"] as const;

export const EQUIPMENT_CONDITIONS = [
  "new",
  "like-new",
  "good",
  "fair",
  "poor",
] as const;

export const EQUIPMENT_STATUSES = ["active", "inactive"] as const;

/** Returns the first File from either a File (server) or a FileList (React Hook Form). */
function pickFile(value: unknown): File | null {
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

export const equipmentSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Equipment name must be at least 2 characters"),
  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters"),
  category: z.string().min(1, "Please select a category"),
  location: z.string().trim().min(2, "Location must be at least 2 characters"),
  rentalPrice: z.coerce.number().min(1, "Rental price must be at least 1"),
  rentalType: z.enum(RENTAL_TYPES, "Please select a rental type"),
  availableQuantity: z.coerce
    .number()
    .int("Quantity must be a whole number")
    .min(1, "Quantity must be at least 1"),
  condition: z.string().min(1, "Please select a condition"),
  brand: z.string().trim().min(1, "Brand is required"),
  model: z.string().trim().min(1, "Model is required"),
  image: z
    .any()
    .refine((value) => pickFile(value) !== null, "Please choose an image")
    .refine((value) => {
      const file = pickFile(value);
      return file === null || file.size <= 5 * 1024 * 1024;
    }, "Image must be 5MB or smaller"),
  rentalTerms: z
    .string()
    .trim()
    .min(10, "Rental terms must be at least 10 characters"),
  status: z.string().min(1, "Please select a status"),
});

export type EquipmentFormValues = z.infer<typeof equipmentSchema>;

/** Input type (before Zod coercion) — what React Hook Form stores. */
export type EquipmentFormInput = z.input<typeof equipmentSchema>;
