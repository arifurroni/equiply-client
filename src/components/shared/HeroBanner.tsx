"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function HeroBanner() {
  const shouldReduceMotion = useReducedMotion();
  const entrance = (delay: number) => ({
    initial: shouldReduceMotion ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  });

  return (
    <main>
      <section className="relative isolate overflow-hidden bg-[#f0fdf4]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 top-12 size-96 rounded-full bg-[#6ee7a5]/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-48 right-0 size-96 rounded-full bg-[#166534]/10 blur-3xl"
        />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 lg:px-8 lg:py-20">
          <div className="max-w-2xl">
            <motion.div
              {...entrance(0.05)}
              className="inline-flex items-center gap-2 rounded-full border border-[#dce9df] bg-white/80 px-3.5 py-2 text-sm font-semibold text-[#166534] shadow-sm"
            >
              <Sparkles aria-hidden="true" size={16} />
              Everything you need. Ready to rent.
            </motion.div>

            <motion.h1
              {...entrance(0.15)}
              className="mt-6 text-4xl font-bold leading-[1.12] tracking-tight text-[#102a24] sm:text-5xl lg:text-6xl"
            >
              The right gear for{" "}
              <span className="text-[#166534]">what comes next.</span>
            </motion.h1>

            <motion.p
              {...entrance(0.25)}
              className="mt-6 max-w-xl text-base leading-7 text-[#52645a] sm:text-lg sm:leading-8"
            >
              Find and rent the equipment you need for your next project, big
              or small. Explore tools, machinery, and more—all in one place.
            </motion.p>

            <motion.div
              {...entrance(0.35)}
              whileHover={shouldReduceMotion ? undefined : { y: -2 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <Link
                href="/equipments"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#166534] px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#102a24] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#166534]"
              >
                Browse All Equipment
                <ArrowRight aria-hidden="true" size={18} />
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={
              shouldReduceMotion ? false : { opacity: 0, scale: 0.97, x: 24 }
            }
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.2, ease: "easeOut" }}
            className="relative mx-auto w-full max-w-2xl lg:max-w-none"
          >
            <div
              aria-hidden="true"
              className="absolute -inset-3 rounded-[2rem] bg-[#6ee7a5]/30 blur-xl"
            />
            <div className="relative min-h-90 overflow-hidden rounded-[1.75rem] border border-white/80 bg-[#dff6e7] shadow-[0_24px_70px_-24px_rgba(16,42,36,0.28)] sm:min-h-110 lg:min-h-125">
              <Image
                src="/images/hero_image.png"
                alt="Construction machinery, tools, and equipment available to rent on Equiply"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-fill"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-linear-to-t from-[#102a24]/25 via-transparent to-white/5"
              />
              {/* <div className="absolute bottom-4 right-4 rounded-xl border border-white/70 bg-white/90 px-4 py-3 shadow-lg backdrop-blur sm:bottom-6 sm:right-6">
                <p className="text-xs font-medium text-[#64756b]">
                  Your next project starts here
                </p>
                <p className="mt-0.5 text-sm font-bold text-[#102a24]">
                  Rent. Work. Create.
                </p>
              </div> */}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
