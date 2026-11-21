"use client";

import {
  CalendarDays,
  Camera,
  Hammer,
  Laptop,
  Sprout,
  Truck,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const categories = [
  {
    name: "Construction Equipment",
    description: "Tools and machinery for your next build.",
    icon: Hammer,
  },
  {
    name: "Photography Equipment",
    description: "Cameras and gear for every shoot.",
    icon: Camera,
  },
  {
    name: "Vehicles & Transportation",
    description: "Get the wheels and transport you need.",
    icon: Truck,
  },
  {
    name: "Agriculture Equipment",
    description: "Reliable equipment for fieldwork.",
    icon: Sprout,
  },
  {
    name: "Electronics",
    description: "Everyday tech for work and projects.",
    icon: Laptop,
  },
  {
    name: "Event Equipment",
    description: "Make your next gathering a success.",
    icon: CalendarDays,
  },
];

export default function EquipmentCategories() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="equipment-categories-heading"
      className="bg-[#f0fdf4] px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#166534]">
            Find what you need
          </p>
          <h2
            id="equipment-categories-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-[#102a24] sm:text-4xl"
          >
            Explore equipment categories
          </h2>
          <p className="mt-4 text-base leading-7 text-[#52645a]">
            From hands-on projects to special occasions, find the right gear
            for the job.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 xl:mt-12 xl:grid-cols-6">
          {categories.map((category, index) => {
            const Icon = category.icon;

            return (
              <motion.article
                key={category.name}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={
                  shouldReduceMotion ? undefined : { opacity: 1, y: 0 }
                }
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="group flex h-full flex-col rounded-2xl border border-[#dce9df] bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-[#e8f7ed] text-[#166534] transition-colors group-hover:bg-[#166534] group-hover:text-white">
                  <Icon aria-hidden="true" size={22} strokeWidth={1.8} />
                </span>
                <h3 className="mt-4 text-sm font-bold leading-5 text-[#102a24] sm:text-base">
                  {category.name}
                </h3>
                <p className="mt-2 text-xs leading-5 text-[#64756b] sm:text-sm">
                  {category.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
