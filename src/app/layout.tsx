import type { Metadata } from "next";
import { Inter } from "next/font/google";


import "./globals.css";

import { Toaster } from "@/components/ui/toast";


const inter = Inter({
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Equiply | Equipment Rental Platform",
  description: "Find the equipment you need. Ready to rent.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.className} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        
        {children}
        <Toaster />
      
      </body>
    </html>
  );
};

// function NavbarSkeleton() {
//   return (
//     <header className="sticky top-0 z-50 h-19 border-b border-[#dce9df] bg-white/95">
//       <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
//         <div className="h-10 w-32 animate-pulse rounded-lg bg-[#f0fdf4]" />
//         <div className="hidden h-8 w-64 animate-pulse rounded-lg bg-[#f0fdf4] lg:block" />
//         <div className="h-9 w-24 animate-pulse rounded-lg bg-[#f0fdf4]" />
//       </div>
//     </header>
//   );
// }
