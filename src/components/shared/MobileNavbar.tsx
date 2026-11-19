
"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import Signout from "./Signout";

type Props = {
  user: {
    name?: string | null;
    image?: string | null;
  } | null;
};

const navigationLinks = [
  { label: "Home", href: "/" },
  { label: "All Equipment", href: "/equipments" },
  { label: "How it works", href: "/how-it-works" },
  { label: "About us", href: "/about" },
  { label: "Contact us", href: "/contact" },
];

export default function MobileNavbar({ user }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const profileInitial =
    user?.name?.trim().charAt(0).toUpperCase() || "U";

  return (
    <div className="relative lg:hidden">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        className="flex items-center gap-2 rounded-lg border border-[#dce9df] px-3 py-2 text-sm font-semibold text-[#102a24]"
      >
        {isOpen ? <X size={18} /> : <Menu size={18} />}
        {isOpen ? "Close" : "Menu"}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-[min(20rem,calc(100vw-2rem))] rounded-xl border border-[#dce9df] bg-white p-3 shadow-lg">
          <div className="flex flex-col">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-[#52645a] hover:bg-[#f0fdf4] hover:text-[#166534]"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="mt-2 border-t border-[#dce9df] pt-3">
            {user ? (
              <div className="flex flex-col items-center gap-3">
                <Link
                  href="/profile"
                  title={`View your profile`}
                  onClick={() => setIsOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#dce9df] px-3 py-2"
                >
                  <Avatar className="size-8 ring-1 ring-[#dce9df]">
                    {user.image && (
                      <AvatarImage src={user.image} alt="" />
                    )}
                    <AvatarFallback className="bg-[#f0fdf4] text-xs font-semibold text-[#166534]">
                      {profileInitial}
                    </AvatarFallback>
                  </Avatar>

                  <span className="max-w-40 truncate text-sm font-semibold text-[#102a24]">
                    {user.name || "My profile"}
                  </span>
                </Link>

                <div className="flex w-full gap-3">
                  <Link
                    href="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 rounded-lg bg-[#166534] px-3 py-2.5 text-center text-sm font-semibold text-white"
                  >
                    Dashboard
                  </Link>

                  <Signout />
                </div>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link
                  href="/signin"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 rounded-lg border border-[#dce9df] px-3 py-2.5 text-center text-sm font-semibold text-[#102a24]"
                >
                  Login
                </Link>

                <Link
                  href="/signup"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 rounded-lg bg-[#166534] px-3 py-2.5 text-center text-sm font-semibold text-white"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
