import { LucideIcon } from "lucide-react";
import type { TLocation } from "@/lib/locations";

export type TUserRole = "customer" | "admin" | "owner";

export type TUser = {
    name: string,
    email: string,
    image?: string | null,
    role?: TUserRole | null,
    location?: TLocation | null,
}

export type TAdminUser = {
    id: string,
    name: string,
    email: string,
    role: TUserRole,
    location: TLocation | null,
    createdAt: string | null,
}

export type TAdminUserUpdate = {
    role?: TUserRole,
    location?: TLocation,
}

export type TDashboardSidebarItem = {
    title: string,
    href: string,
    icon: LucideIcon,
    roles?: TUserRole[],
}

// ---------- Equipment ----------

export type TRentalType = "daily" | "weekly" | "monthly";

export type TEquipmentCondition = "new" | "like-new" | "good" | "fair" | "poor";

export type TEquipmentStatus = "active" | "inactive";
export type TEquipmentApprovalStatus = "pending" | "approved" | "rejected";

export type TOwnerSummary = {
    name: string,
    image: string | null,
    location: string | null,
}

export type TEquipment = {
    _id: string,
    name: string,
    description: string,
    category: string,
    location: string,
    rentalPrice: number,
    rentalType: TRentalType,
    availableQuantity: number,
    condition: TEquipmentCondition,
    brand: string,
    model: string,
    image: string,
    rentalTerms: string,
    status: TEquipmentStatus,
    ownerId: string,
    createdAt: string,
    updatedAt: string,
    approvalStatus?: TEquipmentApprovalStatus,
    owner?: TOwnerSummary | null,
    favoritedAt?: string,
}

export type TAdminEquipment = TEquipment & {
    approvalStatus: TEquipmentApprovalStatus,
}

export type TAdminEquipmentUpdate = Pick<
    TEquipment,
    | "name"
    | "description"
    | "category"
    | "location"
    | "rentalPrice"
    | "rentalType"
    | "availableQuantity"
    | "condition"
    | "brand"
    | "model"
    | "image"
    | "rentalTerms"
    | "status"
>

// ---------- Server action result ----------

export type TActionState = {
    success: boolean,
    message: string,
    data?: unknown,
}
