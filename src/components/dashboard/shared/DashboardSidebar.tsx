"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Building2,
    CalendarCheck,
//   CalendarDays,
  LayoutDashboard,
  Package,
  UserRound,
} from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import Signout from "@/components/shared/Signout";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";
import { TUser, TUserRole } from "@/types";


const roleBasedSidebarItems = {
    customer: [
        {
            title: "My Rentals",
            href: "/dashboard/customer/my-rentals",
            icon: LayoutDashboard,
        },
        {
            title: "Favorites",
            href: "/dashboard/customer/favorites",
            icon: CalendarCheck,
        },
        {
            title: "My profile",
            href: "/profile",
            icon: UserRound,
        },
    ],
    admin: [
        {
            title: "All Users",
            href: "/dashboard/admin/all-users",
            icon: LayoutDashboard,
        },
        {
            title: "All Equipments",
            href: "/dashboard/admin/all-equipments",
            icon: CalendarCheck,
        },
        {
            title: "All Rentals",
            href: "/dashboard/admin/all-rentals",
            icon: Package,
        },
        {
            title: "My location",
            href: "/dashboard/admin/locations",
            icon: Building2,
        },
        {
            title: "My profile",
            href: "/profile",
            icon: UserRound,
        },
    ],
    owner: [
        {
            title: "Add Equipment",
            href: "/dashboard/owner/add-equipment",
            icon: LayoutDashboard,
        },
        {
            title: "My Equipment",
            href: "/dashboard/owner/equipments",
            icon: Package,
        },
        {
            title: "My Equipment Rental",
            href: "/dashboard/owner/equipment-rental",
            icon: Building2,
        },
        {
            title: "My profile",
            href: "/profile",
            icon: UserRound,
        },
    ],
}

// const navigationGroups = [
//   {
//     label: "Menu",
//     items: [
//       { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
//       { label: "My bookings", href: "/dashboard/bookings", icon: CalendarDays },
//       { label: "My equipment", href: "/dashboard/equipment", icon: Package },
//     ],
//   },
//   {
//     label: "Account",
//     items: [{ label: "My profile", href: "/profile", icon: UserRound }],
//   },
// ];

// type DashboardSidebarProps = {
//   user: {
//     name: string | null;
//     image: string | null;
//   } | null;
// };



const DashboardSidebar = ({ user }: {user: TUser | null}) => {

  const pathname = usePathname();
  const { isMobile, setOpenMobile } = useSidebar();
  const profileInitial = user?.name?.trim().charAt(0).toUpperCase() || "U";

const role: TUserRole = user?.role ?? "customer";

const sidebarItems = roleBasedSidebarItems[role];
//   const role = user?.role || "customer"; // Default role.
//   const sidebarItems = roleBasedSidebarItems[role as TUserRole] || [];
//   console.log(sidebarItems, "SidebarItems");

  return (
    <Sidebar
      collapsible="icon"
      className="top-1.5 h-[calc(100svh-10px)]"
    >
      <SidebarHeader className="py-1 px-3">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-[#166534]"
          aria-label="Equiply home"
        >
          <Image
            src="/images/logo.png"
            alt=""
            width={40}
            height={34}
            className="size-10 shrink-0 rounded-lg object-contain"
          />
          <span className="min-w-0 group-data-[collapsible=icon]:hidden">
            <span className="block truncate text-base font-bold text-[#102a24]">
              Equiply
            </span>
            <span className="block truncate text-xs text-[#64756b]">
              Dashboard
            </span>
          </span>
        </Link>
      </SidebarHeader>

          <SidebarSeparator className="mx-0" />


          <SidebarContent className="gap-1 px-2 py-1">
              <SidebarGroup className="p-0">
                  <SidebarGroupLabel className="px-2 text-[#64756b]">
                      {role.charAt(0).toUpperCase() + role.slice(1)} Menu
                  </SidebarGroupLabel>

                  <SidebarGroupContent>
                      <SidebarMenu className="gap-1">
                          {sidebarItems.map((item) => {
                              const isActive =
                                  pathname === item.href ||
                                  (item.href !== "/dashboard" &&
                                      pathname.startsWith(`${item.href}/`));

                              const Icon = item.icon;

                              return (
                                  <SidebarMenuItem key={item.href}>
                                      <SidebarMenuButton
                                          render={<Link href={item.href} />}
                                          isActive={isActive}
                                          tooltip={item.title}
                                          onClick={() => {
                                              if (isMobile) setOpenMobile(false);
                                          }}
                                          className="h-10 rounded-lg px-3 text-[#52645a] hover:bg-[#f0fdf4] hover:text-[#166534] data-active:bg-[#e8f7ed] data-active:text-[#166534]"
                                      >
                                          <Icon aria-hidden="true" />
                                          <span>{item.title}</span>
                                      </SidebarMenuButton>
                                  </SidebarMenuItem>
                              );
                          })}
                      </SidebarMenu>
                  </SidebarGroupContent>
              </SidebarGroup>
          </SidebarContent>


      {/* <SidebarContent className="gap-1 px-2 py-3">
        {navigationGroups.map((group) => (
          <SidebarGroup key={group.label} className="p-0">
            <SidebarGroupLabel className="px-2 text-[#64756b]">
              {group.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-1">
                {group.items.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    (item.href !== "/dashboard" &&
                      pathname.startsWith(`${item.href}/`));
                  const Icon = item.icon;

                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        render={<Link href={item.href} />}
                        isActive={isActive}
                        tooltip={item.label}
                        onClick={() => {
                          if (isMobile) setOpenMobile(false);
                        }}
                        className="h-10 rounded-lg px-3 text-[#52645a] hover:bg-[#f0fdf4] hover:text-[#166534] data-active:bg-[#e8f7ed] data-active:text-[#166534]"
                      >
                        <Icon aria-hidden="true" />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent> */}

      <SidebarFooter className="py-1 px-3">
        {/* <div className="rounded-xl bg-[#f0fdf4] p-3 group-data-[collapsible=icon]:hidden">
          <p className="text-sm font-semibold text-[#102a24]">
            Need equipment?
          </p>
          <Link
            href="/equipments"
            className="mt-1 inline-block text-xs font-medium text-[#166534] underline-offset-4 hover:underline"
          >
            Browse the marketplace
          </Link>
        </div> */}
        <SidebarSeparator className="mx-0" />
        <Link
          href="/profile"
          title={"View Your profile"}
          aria-label={`View profile for ${user?.name || "your account"}`}
          onClick={() => {
            if (isMobile) setOpenMobile(false);
          }}
          className="flex min-w-0 items-center gap-3 rounded-xl p-1 transition-colors hover:bg-[#f0fdf4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#166534] group-data-[collapsible=icon]:justify-center"
        >
          <Avatar className="size-9 shrink-0 ring-1 ring-[#dce9df]">
            {user?.image && <AvatarImage src={user.image} alt="" />}
            <AvatarFallback className="bg-[#f0fdf4] text-sm font-semibold text-[#166534]">
              {profileInitial}
            </AvatarFallback>
          </Avatar>
          <span className="min-w-0 group-data-[collapsible=icon]:hidden">
            <span className="block truncate text-sm font-semibold text-[#102a24]">
              {user?.name || "My profile"}
            </span>
            <span className="block text-xs text-[#64756b]">{user?.email}</span>
          </span>
        </Link>
        <Signout
          showIcon
          labelClassName="group-data-[collapsible=icon]:hidden"
          className="h-10 w-full justify-start rounded-xl border-transparent px-2 text-[#52645a] hover:border-transparent hover:bg-red-50 hover:text-red-700 group-data-[collapsible=icon]:justify-center"
        />
      </SidebarFooter>
    </Sidebar>
  );
}

export default DashboardSidebar;