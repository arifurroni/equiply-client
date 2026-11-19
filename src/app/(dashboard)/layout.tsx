import type { ReactNode } from "react";
import { headers } from "next/headers";
import DashboardSidebar from "@/components/dashboard/shared/DashboardSidebar";
import { auth } from "@/lib/auth";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";


export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <SidebarProvider>
      <DashboardSidebar
        user={
          session?.user
            ? {
                name: session.user.name,
                email: session.user.email,
                image: session.user.image ?? null,
              }
            : null
        }
      />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-3 border-b border-[#dce9df] bg-white px-4">
          <SidebarTrigger className="text-[#52645a] hover:bg-[#f0fdf4] hover:text-[#166534]" />
          <div className="h-5 w-px bg-[#dce9df]" aria-hidden="true" />
          <p className="text-sm font-semibold text-[#102a24]">Dashboard</p>
        </header>
        <div className="flex-1">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
