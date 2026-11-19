import type { Metadata } from "next";

import Navbar from "@/components/shared/Navbar";

import Footer from "@/components/shared/Footer";
// import { Toaster } from "@/components/ui/toast";
import { Suspense } from "react";



export const metadata: Metadata = {
  title: "Equiply | Equipment Rental Platform",
  description: "Find the equipment you need. Ready to rent.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
  
      <>
        <Suspense fallback={<NavbarSkeleton />}>
          <Navbar />
        </Suspense>
        {children}
        {/* <Toaster /> */}
        <Footer />
      </>
  
  );
};

function NavbarSkeleton() {
  return (
    <header className="sticky top-0 z-50 h-19 border-b border-[#dce9df] bg-white/95">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="h-10 w-32 animate-pulse rounded-lg bg-[#f0fdf4]" />
        <div className="hidden h-8 w-64 animate-pulse rounded-lg bg-[#f0fdf4] lg:block" />
        <div className="h-9 w-24 animate-pulse rounded-lg bg-[#f0fdf4]" />
      </div>
    </header>
  );
}
