import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found | Equiply",
  description: "The page you are looking for could not be found.",
};

export default function NotFound() {
  return (
    <main className="relative flex flex-1 items-center justify-center overflow-hidden bg-[#f0fdf4] px-4 py-16 sm:px-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-36 top-8 size-80 rounded-full bg-[#6ee7a5]/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -right-32 size-96 rounded-full bg-[#166534]/10 blur-3xl"
      />

      <section className="relative w-full max-w-xl rounded-3xl border border-[#dce9df] bg-white px-6 py-12 text-center shadow-[0_24px_80px_-32px_rgba(16,42,36,0.2)] sm:px-12 sm:py-16">
        <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-[#f0fdf4] text-[#166534]">
          <Compass aria-hidden="true" size={30} />
        </div>
        <p className="mt-7 text-sm font-bold uppercase tracking-[0.2em] text-[#166534]">
          Error 404
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#102a24] sm:text-4xl">
          This page is off the map.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-[#64756b] sm:text-base">
          We couldn&apos;t find the page you were looking for. It may have moved
          or the address might be incorrect.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/equipments"
            className="inline-flex h-12 items-center justify-center rounded-xl bg-[#166534] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#102a24] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#166534]"
          >
            Explore equipment
          </Link>
          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-[#dce9df] bg-white px-5 text-sm font-semibold text-[#102a24] transition-colors hover:bg-[#f8fbf8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#166534]"
          >
            <ArrowLeft aria-hidden="true" size={17} />
            Back to home
          </Link>
        </div>
      </section>
    </main>
  );
}
