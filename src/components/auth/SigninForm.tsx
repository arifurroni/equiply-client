"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  KeyRound,
  Mail,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SigninForm() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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
              Your next project starts here.
            </h2>
            <p className="mt-5 max-w-sm text-base leading-7 text-white/70">
              Pick up where you left off and find the equipment that makes
              getting things done easier.
            </p>
          </div>

          <div className="relative mt-12 space-y-4 rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm font-semibold">With Equiply, you can</p>
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
              Welcome back
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#102a24] sm:text-4xl">
              Sign in to Equiply
            </h1>
            <p className="mt-3 text-sm leading-6 text-[#64756b]">
              Enter your account details to continue.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-[#172b24]"
                >
                  Email address
                </Label>
                <div className="relative">
                  <Mail
                    aria-hidden="true"
                    size={18}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64756b]"
                  />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    required
                    className="h-12 rounded-xl border-[#dce9df] bg-white pl-11 pr-4 text-sm text-[#172b24] placeholder:text-[#94a49a] focus-visible:border-[#166534] focus-visible:ring-[#166534]/10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-[#172b24]"
                >
                  Password
                </Label>
                <div className="relative">
                  <KeyRound
                    aria-hidden="true"
                    size={18}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64756b]"
                  />
                  <Input
                    id="password"
                    name="password"
                    type={isPasswordVisible ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    required
                    className="h-12 rounded-xl border-[#dce9df] bg-white pl-11 pr-12 text-sm text-[#172b24] placeholder:text-[#94a49a] focus-visible:border-[#166534] focus-visible:ring-[#166534]/10"
                  />
                  <button
                    type="button"
                    aria-label={
                      isPasswordVisible ? "Hide password" : "Show password"
                    }
                    aria-pressed={isPasswordVisible}
                    onClick={() => setIsPasswordVisible((visible) => !visible)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-[#64756b] transition-colors hover:text-[#166534] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#166534]"
                  >
                    {isPasswordVisible ? (
                      <EyeOff aria-hidden="true" size={18} />
                    ) : (
                      <Eye aria-hidden="true" size={18} />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="h-12 w-full rounded-xl bg-[#166534] px-4 text-sm font-semibold text-white hover:bg-[#102a24]"
              >
                Sign in
                <ArrowRight aria-hidden="true" size={18} />
              </Button>

              <div className="flex items-center gap-4 py-1">
                <span className="h-px flex-1 bg-[#dce9df]" />
                <span className="text-xs font-medium text-[#64756b]">
                  OR CONTINUE WITH
                </span>
                <span className="h-px flex-1 bg-[#dce9df]" />
              </div>

              <Button
                type="button"
                variant="outline"
                className="h-12 w-full rounded-xl border-[#dce9df] bg-white px-4 text-sm font-semibold text-[#172b24] hover:bg-[#f8fbf8]"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 48 48"
                  className="size-5"
                >
                  <path
                    fill="#EA4335"
                    d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"
                    transform="translate(0 4)"
                  />
                  <path
                    fill="#4285F4"
                    d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94a11.05 11.05 0 0 1-4.8 7.24l7.73 5.99c4.52-4.18 7.11-10.34 7.11-17.7Z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M10.53 28.59a14.4 14.4 0 0 1 0-9.18l-7.98-6.19a23.9 23.9 0 0 0 0 21.56l7.98-6.19Z"
                    transform="translate(0 4)"
                  />
                  <path
                    fill="#34A853"
                    d="M24 48c6.48 0 11.93-2.13 15.9-5.8l-7.73-5.99c-2.14 1.44-4.89 2.29-8.17 2.29-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
                    transform="translate(0 -4)"
                  />
                </svg>
                Sign in with Google
              </Button>
            </form>

            <p className="mt-8 text-center text-sm text-[#64756b]">
              New to Equiply?{" "}
              <Link
                href="/signup"
                className="font-semibold text-[#166534] underline-offset-4 hover:underline focus-visible:underline"
              >
                Create an account
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
