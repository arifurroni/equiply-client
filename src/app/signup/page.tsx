"use client";

import type { FormEvent } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Image as ImageIcon,
  KeyRound,
  Mail,
  Sparkles,
  UserRound,
} from "lucide-react";

export default function SignUpPage() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <main className="relative flex flex-1 items-center justify-center overflow-hidden bg-[#f0fdf4] px-4 py-12 sm:px-6 sm:py-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-36 top-12 size-80 rounded-full bg-[#6ee7a5]/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -right-32 size-96 rounded-full bg-[#166534]/10 blur-3xl"
      />

      <div className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-[#dce9df] bg-white shadow-[0_24px_80px_-32px_rgba(16,42,36,0.28)] lg:grid lg:grid-cols-[0.9fr_1.1fr]">
        <section className="relative hidden flex-col justify-between overflow-hidden bg-[#102a24] p-10 text-white lg:flex xl:p-12">
          <div
            aria-hidden="true"
            className="absolute -bottom-24 -right-24 size-80 rounded-full border-48 border-[#6ee7a5]/10"
          />
          <div className="relative">
            <div className="mb-12 inline-flex size-12 items-center justify-center rounded-2xl bg-[#6ee7a5]/15 text-[#6ee7a5]">
              <Sparkles aria-hidden="true" size={23} />
            </div>
            <p className="text-sm font-semibold text-[#6ee7a5]">
              Everything you need. Ready to rent.
            </p>
            <h2 className="mt-4 text-4xl font-bold leading-tight tracking-tight">
              Make room for what&apos;s next.
            </h2>
            <p className="mt-5 max-w-sm text-base leading-7 text-white/70">
              Create an account and find the equipment you need for your next
              project, event, or big idea.
            </p>
          </div>

          <div className="relative mt-12 space-y-4 rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm font-semibold">A simpler way to rent</p>
            <p className="flex items-center gap-3 text-sm text-white/75">
              <Check
                aria-hidden="true"
                className="shrink-0 text-[#6ee7a5]"
                size={17}
              />
              Discover equipment for work and life
            </p>
            <p className="flex items-center gap-3 text-sm text-white/75">
              <Check
                aria-hidden="true"
                className="shrink-0 text-[#6ee7a5]"
                size={17}
              />
              Keep your rentals in one place
            </p>
          </div>
        </section>

        <section className="px-6 py-10 sm:px-12 sm:py-14 lg:px-14">
          <div className="mx-auto max-w-md">
            <div className="mb-8 inline-flex size-12 items-center justify-center rounded-2xl bg-[#f0fdf4] text-[#166534] lg:hidden">
              <Sparkles aria-hidden="true" size={22} />
            </div>
            <p className="text-sm font-semibold text-[#166534]">
              Get started for free
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#102a24] sm:text-4xl">
              Create your account
            </h1>
            <p className="mt-3 text-sm leading-6 text-[#64756b]">
              A few details and you&apos;re ready to explore.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-[#172b24]"
                >
                  Full name
                </label>
                <div className="relative">
                  <UserRound
                    aria-hidden="true"
                    size={18}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64756b]"
                  />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    required
                    className="h-12 w-full rounded-xl border border-[#dce9df] bg-white pl-11 pr-4 text-sm text-[#172b24] outline-none transition placeholder:text-[#94a49a] focus:border-[#166534] focus:ring-4 focus:ring-[#166534]/10"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-[#172b24]"
                >
                  Email address
                </label>
                <div className="relative">
                  <Mail
                    aria-hidden="true"
                    size={18}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64756b]"
                  />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    required
                    className="h-12 w-full rounded-xl border border-[#dce9df] bg-white pl-11 pr-4 text-sm text-[#172b24] outline-none transition placeholder:text-[#94a49a] focus:border-[#166534] focus:ring-4 focus:ring-[#166534]/10"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="image"
                  className="mb-2 flex items-center justify-between text-sm font-medium text-[#172b24]"
                >
                  Profile image URL
                  {/* <span className="text-xs font-normal text-[#64756b]">
                    Optional
                  </span> */}
                </label>
                <div className="relative">
                  <ImageIcon
                    aria-hidden="true"
                    size={18}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64756b]"
                  />
                  <input
                    id="image"
                    name="image"
                    type="url"
                    placeholder="https://example.com/photo.jpg"
                    required
                    className="h-12 w-full rounded-xl border border-[#dce9df] bg-white pl-11 pr-4 text-sm text-[#172b24] outline-none transition placeholder:text-[#94a49a] focus:border-[#166534] focus:ring-4 focus:ring-[#166534]/10"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-[#172b24]"
                >
                  Password
                </label>
                <div className="relative">
                  <KeyRound
                    aria-hidden="true"
                    size={18}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64756b]"
                  />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Create a password"
                    required
                    className="h-12 w-full rounded-xl border border-[#dce9df] bg-white pl-11 pr-4 text-sm text-[#172b24] outline-none transition placeholder:text-[#94a49a] focus:border-[#166534] focus:ring-4 focus:ring-[#166534]/10"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#166534] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#102a24] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#166534]"
              >
                Create account
                <ArrowRight aria-hidden="true" size={18} />
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-[#64756b]">
              Already have an account?{" "}
              <Link
                href="/signin"
                className="font-semibold text-[#166534] underline-offset-4 hover:underline focus-visible:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
