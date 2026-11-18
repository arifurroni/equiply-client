import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const footerGroups = [
  {
    title: "Explore",
    links: [
      { label: "All equipment", href: "/equipment" },
      { label: "How it works", href: "/how-it-works" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Contact us", href: "/contact" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Login", href: "/signin" },
      { label: "Register", href: "/signup" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-auto bg-[#102a24] text-white">
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-12 sm:px-6 sm:pt-16 lg:px-8">
        <section
          aria-labelledby="footer-cta-title"
          className="relative isolate overflow-hidden rounded-3xl bg-[#e8f7ed] px-6 py-8 text-[#102a24] sm:px-10 sm:py-10 lg:flex lg:items-center lg:justify-between lg:px-12"
        >
          <div
            aria-hidden="true"
            className="absolute -right-12 -top-20 -z-10 size-64 rounded-full border-36 border-[#6ee7a5]/20"
          />
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#166534]">
              Equiply marketplace
            </p>
            <h2
              id="footer-cta-title"
              className="text-2xl font-bold tracking-tight sm:text-3xl"
            >
              Find the right gear for what comes next.
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[#52645a] sm:text-base">
              Explore equipment for your next project, event, or big idea.
            </p>
          </div>
          <Link
            href="/equipment"
            className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#166534] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#102a24] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#166534] lg:mt-0"
          >
            Browse equipment
            <ArrowRight aria-hidden="true" size={18} />
          </Link>
        </section>

        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.7fr_1fr_1fr_1fr] lg:gap-12 lg:py-14">
          <div className="max-w-sm">
            <Link
              href="/"
              aria-label="Equiply home"
              className="inline-flex items-center gap-3 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6ee7a5]"
            >
              <span className="flex size-12 items-center justify-center overflow-hidden rounded-xl bg-white">
                <Image
                  src="/images/logo.png"
                  alt=""
                  width={48}
                  height={40}
                  className="h-10 w-12 object-contain"
                />
              </span>
              <span className="text-2xl font-bold tracking-tight">Equiply</span>
            </Link>
            <p className="mt-4 text-sm leading-6 text-[#c0d0c6]">
              Everything you need. Ready to rent. Discover the equipment that
              helps get the job done.
            </p>
          </div>

          {footerGroups.map((group) => (
            <nav key={group.title} aria-label={`${group.title} links`}>
              <h2 className="text-sm font-semibold text-white">{group.title}</h2>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#c0d0c6] transition-colors hover:text-[#6ee7a5] focus-visible:text-[#6ee7a5] focus-visible:outline-none"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-col gap-3 border-t border-white/15 pt-6 text-xs text-[#c0d0c6] sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; 2026 Equiply. All rights reserved.</p>
          <p>Everything you need. Ready to rent.</p>
        </div>
      </div>
    </footer>
  );
}