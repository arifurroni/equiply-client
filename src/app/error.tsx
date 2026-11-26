"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RefreshCw, TriangleAlert } from "lucide-react";

/**
 * Root error boundary. Catches unexpected errors thrown while rendering
 * any page below the root layout (including dashboard layouts) and shows
 * a friendly retry UI instead of Vercel's generic error page.
 *
 * Note: in production, error messages from Server Components are redacted
 * by Next.js — only `error.digest` is available to match server logs.
 */
export default function RootErrorBoundary({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error("Route error:", error);
  }, [error]);

  return (
    <main className="flex min-h-[60vh] flex-1 items-center justify-center px-4 py-12">
      <section className="w-full max-w-lg rounded-3xl border border-[#dce9df] bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-red-50">
          <TriangleAlert
            aria-hidden="true"
            className="size-7 text-red-600"
          />
        </div>

        <h1 className="mt-5 text-2xl font-bold tracking-tight text-[#102a24]">
          Something went wrong
        </h1>

        <p className="mt-3 text-sm leading-6 text-[#64756b]">
          We could not load this page right now. This is usually temporary —
          please try again.
        </p>

        {error?.digest ? (
          <p className="mt-3 text-xs text-[#94a49a]">
            Error ID: {error.digest}
          </p>
        ) : null}

        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => retry()}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#166534] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#102a24]"
          >
            <RefreshCw aria-hidden="true" size={16} />
            Try again
          </button>

          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-xl border border-[#dce9df] px-6 text-sm font-semibold text-[#102a24] transition-colors hover:bg-[#f0fdf4] hover:text-[#166534]"
          >
            Go to home
          </Link>
        </div>
      </section>
    </main>
  );
}
