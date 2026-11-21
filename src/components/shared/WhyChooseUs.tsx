"use client";

import {
  BadgeCheck,
  CalendarClock,
  CreditCard,
  WalletCards,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const benefits = [
  {
    title: "Fair, affordable prices",
    description:
      "Rent the equipment you need without the cost of buying, storing, and maintaining it.",
    icon: WalletCards,
  },
  {
    title: "Trusted equipment owners",
    description:
      "Find equipment from owner accounts reviewed for a more dependable rental experience.",
    icon: BadgeCheck,
  },
  {
    title: "Flexible rental periods",
    description:
      "Choose rental durations that fit your project, whether it takes a day or longer.",
    icon: CalendarClock,
  },
  {
    title: "Secure payments",
    description:
      "Pay through a secure checkout and keep your booking details together in one place.",
    icon: CreditCard,
  },
];

export default function WhyChooseUs() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="why-choose-us-heading"
      className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#166534]">
            Why Equiply
          </p>
          <h2
            id="why-choose-us-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-[#102a24] sm:text-4xl"
          >
            A better way to get the job done
          </h2>
          <p className="mt-4 text-base leading-7 text-[#52645a]">
            Get the right equipment from trusted owners, with rental options
            designed around your work.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;

            return (
              <motion.article
                key={benefit.title}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={
                  shouldReduceMotion ? undefined : { opacity: 1, y: 0 }
                }
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="h-full rounded-2xl border border-[#dce9df] bg-[#fbfefc] p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex size-12 items-center justify-center rounded-xl bg-[#e8f7ed] text-[#166534]">
                  <Icon aria-hidden="true" size={23} strokeWidth={1.8} />
                </div>
                <h3 className="mt-5 text-lg font-bold text-[#102a24]">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#52645a]">
                  {benefit.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
