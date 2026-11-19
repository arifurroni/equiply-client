
import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
// import { Menu } from "lucide-react";
// import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import Signout from "./Signout";
import MobileNavbar from "./MobileNavbar";

const navigationLinks = [
  { label: "Home", href: "/" },
  { label: "All Equipment", href: "/equipments" },
  { label: "How it works", href: "/how-it-works" },
  { label: "About us", href: "/about" },
  { label: "Contact us", href: "/contact" },
];

// type NavbarProps = {
//   logoutHref?: string;
// };

// // Server Action: Logout
// async function signOut() {
//   "use server";

//   await auth.api.signOut({
//     headers: await headers(),
//   });

//   redirect("/signin");
// }

export default async function Navbar(
//   {
//   // logoutHref = "/signin",
// }: NavbarProps
) {

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;
  const profileInitial = user?.name?.trim().charAt(0).toUpperCase() || "U";

  return (
    <header className="sticky top-0 z-50 border-b border-[#dce9df] bg-white/95 backdrop-blur">
      <nav
        aria-label="Main navigation"
        className="relative mx-auto flex h-19 max-w-7xl items-center justify-between gap-5 px-4 sm:px-6 lg:px-8"
      >
        {/* Logo */}
        <Link
          href="/"
          aria-label="Equiply home"
          className="flex shrink-0 items-center gap-2"
        >
          <Image
            src="/images/logo.png"
            alt="Equiply logo"
            width={48}
            height={40}
            priority
            className="h-10 w-12 rounded-xl object-contain"
          />

          <div>
            <span className="text-2xl font-bold tracking-tight text-[#102a24]">
              Equiply
            </span>
            <p className="text-xs font-bold text-[#102a24]">
              Everything you need. Ready to rent.
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-5 lg:flex xl:gap-7">
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap text-sm font-medium text-[#52645a] transition-colors hover:text-[#166534]"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Authentication */}
        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold text-[#166534] transition-colors hover:bg-[#f0fdf4]"
              >
                Dashboard
              </Link>

              <Link
                href="/profile"
                title={`View your profile`}
                aria-label={`View profile for ${user.name || "your account"}`}
                className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-[#f0fdf4]"
              >
                <Avatar className="size-9 ring-1 ring-[#dce9df]">
                  {user.image && <AvatarImage src={user.image} alt="" />}
                  <AvatarFallback className="bg-[#f0fdf4] text-sm font-semibold text-[#166534]">
                    {profileInitial}
                  </AvatarFallback>
                </Avatar>
                <span className="max-w-32 truncate text-sm font-semibold text-[#102a24]">
                  {user.name || "My profile"}
                </span>
              </Link>

              <Signout />
              {/* <form action={signOut}>
                <button
                  type="submit"
                  className="whitespace-nowrap rounded-lg border border-[#dce9df] px-4 py-2 text-sm font-semibold text-[#102a24] transition-colors hover:border-[#166534] hover:text-[#166534]"
                >
                  Logout
                </button>
              </form> */}
            </>
          ) : (
            <>
              <Link
                href="/signin"
                className="whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold text-[#102a24] transition-colors hover:text-[#166534]"
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="whitespace-nowrap rounded-lg bg-[#166534] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#102a24]"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Navigation */}
        <MobileNavbar user={user ?? null} />
        
      </nav>
    </header>
  );
}
