"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, MapPin, Star } from "lucide-react";

import { useSession } from "@/lib/auth-client";
import type { TEquipment } from "@/types";

const buttonClass =
  "inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-[#166534] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#102a24] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#166534]";

export default function FeaturedEquipment({
  equipments,
  loadError,
}: {
  equipments: TEquipment[];
  loadError: string | null;
}) {
  const shouldReduceMotion = useReducedMotion();
  const { data: session, isPending } = useSession();

  return (
    <section
      aria-labelledby="featured-equipment-heading"
      className="bg-[#f8fbf8] px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-[#166534]">
              <Star aria-hidden="true" size={16} fill="currentColor" />
              Handpicked for you
            </p>
            <h2
              id="featured-equipment-heading"
              className="mt-3 text-3xl font-bold tracking-tight text-[#102a24] sm:text-4xl"
            >
              Featured equipment
            </h2>
            <p className="mt-3 text-base leading-7 text-[#52645a]">
              Explore recently approved equipment from owners in your area.
            </p>
          </div>

        </div>

        {loadError ? (
          <p
            role="status"
            className="mt-8 rounded-2xl border border-[#dce9df] bg-white p-8 text-center text-sm text-[#52645a]"
          >
            {loadError}
          </p>
        ) : equipments.length === 0 ? (
          <p className="mt-8 rounded-2xl border border-[#dce9df] bg-white p-8 text-center text-sm text-[#52645a]">
            No equipment has been approved yet. Please check back soon.
          </p>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {equipments.map((equipment, index) => (
              <motion.article
                key={equipment._id}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={
                  shouldReduceMotion ? undefined : { opacity: 1, y: 0 }
                }
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: index * 0.07 }}
                className="flex h-full flex-col overflow-hidden rounded-2xl border border-[#dce9df] bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="relative aspect-4/3 overflow-hidden bg-[#e8f7ed]">
                  <Image
                    src={equipment.image}
                    alt={equipment.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 hover:scale-[1.03]"
                  />
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#166534]">
                        {equipment.category}
                      </p>
                      <h3 className="mt-1 line-clamp-2 text-lg font-bold text-[#102a24]">
                        {equipment.name}
                      </h3>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="font-bold text-[#166534]">
                        ${equipment.rentalPrice}
                      </p>
                      <p className="text-xs capitalize text-[#64756b]">
                        per {equipment.rentalType}
                      </p>
                    </div>
                  </div>

                  <p className="mt-3 flex items-center gap-1.5 text-sm text-[#64756b]">
                    <MapPin aria-hidden="true" size={15} />
                    {equipment.location}
                  </p>

                  <div className="mt-auto pt-5">
                    {isPending ? (
                      <span
                        aria-disabled="true"
                        className={`${buttonClass} cursor-wait opacity-70`}
                      >
                        Checking sign-in...
                      </span>
                    ) : (
                      <Link
                        href={
                          session?.user
                            ? `/equipments/${encodeURIComponent(equipment._id)}`
                            : "/signin"
                        }
                        className={buttonClass}
                      >
                        View Details
                        <ArrowRight aria-hidden="true" size={16} />
                      </Link>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
