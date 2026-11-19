import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/shared/Navbar";
import "./globals.css";
import Footer from "@/components/shared/Footer";
import { Toaster } from "@/components/ui/toast";

const inter = Inter({
  subsets: ["latin"],
});

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

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
        <Navbar />
        {children}
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
