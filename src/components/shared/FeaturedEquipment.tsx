"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";

import { useSession } from "@/lib/auth-client";
import EquipmentCard from "./EquipmentCard";
import type { TEquipment } from "@/types";

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
              Explore recently added equipment from owners in your area.
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
            No equipment is listed yet. Please check back soon.
          </p>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {equipments.map((equipment, index) => (
              <motion.div
                key={equipment._id}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={
                  shouldReduceMotion ? undefined : { opacity: 1, y: 0 }
                }
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: index * 0.07 }}
                className="h-full"
              >
                <EquipmentCard
                  equipment={equipment}
                  sessionPending={isPending}
                  detailsHref={
                    isPending
                      ? null
                      : session?.user
                        ? `/equipments/${encodeURIComponent(equipment._id)}`
                        : "/signin"
                  }
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
