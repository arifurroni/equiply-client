import { LucideIcon } from "lucide-react";

export type TUserRole = "admin" | "customer" | "owner";

export type TUser = {
    name: string,
    email: string,
    image?: string | null,
    role?: string | null,
}

type TDashboardSidebarItem = {
    title: string,
    href: string,
    icon: LucideIcon,
    roles?: TUserRole[],
}
