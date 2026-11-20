import { LucideIcon } from "lucide-react";

export type TUserRole = "customer" | "admin" | "owner";

export type TUser = {
    name: string,
    email: string,
    image?: string | null,
    role?: TUserRole | null,
}

export type TDashboardSidebarItem = {
    title: string,
    href: string,
    icon: LucideIcon,
    roles?: TUserRole[],
}
