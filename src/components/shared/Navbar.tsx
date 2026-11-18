import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";

const navigationLinks = [
  { label: "Home", href: "/" },
  { label: "All Equipment", href: "/equipments" },
  { label: "How it works", href: "/how-it-works" },
  { label: "About us", href: "/about" },
  { label: "Contact us", href: "/contact" },
];

type NavbarProps = {
  isLoggedIn?: boolean;
  logoutHref?: string;
};

export default function Navbar({
  isLoggedIn = false,
  logoutHref = "/signout",
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-[#dce9df] bg-white/95 backdrop-blur">
      <nav
        aria-label="Main navigation"
        className="relative mx-auto flex h-19 max-w-7xl items-center justify-between gap-5 px-4 sm:px-6 lg:px-8"
      >
        <Link
          href="/"
          aria-label="Equiply home"
          className="flex shrink-0 items-center gap-2"
        >
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={48}
            height={40}
            priority
            className="h-10 w-12 object-contain rounded-xl"
          />
          <div className="">
            <span className="text-2xl font-bold tracking-tight text-[#102a24]">
            Equiply
          </span>
          <p className="text-xs text-[#102a24] font-bold">Everything you need. Ready to rent</p>
          </div>
        </Link>

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

        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          {isLoggedIn ? (
            <>
              <Link
                href="/dashboard"
                className="whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold text-[#166534] transition-colors hover:bg-[#f0fdf4]"
              >
                Dashboard
              </Link>
              <Link
                href={logoutHref}
                className="whitespace-nowrap rounded-lg border border-[#dce9df] px-4 py-2 text-sm font-semibold text-[#102a24] transition-colors hover:border-[#166534] hover:text-[#166534]"
              >
                Logout
              </Link>
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



        <details className="group lg:hidden">
          <summary className="flex cursor-pointer list-none items-center gap-2 rounded-lg border border-[#dce9df] px-3 py-2 text-sm font-semibold text-[#102a24] [&::-webkit-details-marker]:hidden">
            <Menu aria-hidden="true" size={18} />
            Menu
          </summary>
          <div className="absolute right-4 top-[calc(100%-4px)] z-10 w-[min(20rem,calc(100vw-2rem))] rounded-xl border border-[#dce9df] bg-white p-3 shadow-lg sm:right-6">
            <div className="flex flex-col">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-[#52645a] transition-colors hover:bg-[#f0fdf4] hover:text-[#166534]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="mt-2 flex gap-2 border-t border-[#dce9df] pt-3">
              {isLoggedIn ? (
                <>
                  <Link
                    href="/dashboard"
                    className="flex-1 rounded-lg bg-[#166534] px-3 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-[#102a24]"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href={logoutHref}
                    className="flex-1 rounded-lg border border-[#dce9df] px-3 py-2.5 text-center text-sm font-semibold text-[#102a24] transition-colors hover:border-[#166534] hover:text-[#166534]"
                  >
                    Logout
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/signin"
                    className="flex-1 rounded-lg border border-[#dce9df] px-3 py-2.5 text-center text-sm font-semibold text-[#102a24] transition-colors hover:border-[#166534] hover:text-[#166534]"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="flex-1 rounded-lg bg-[#166534] px-3 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-[#102a24]"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </details>
      </nav>
    </header>
  );
}
