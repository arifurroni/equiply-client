"use client";

import { Star } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const reviews = [
  {
    name: "Samira Rahman",
    rating: 5,
    comment:
      "I found the tools I needed for a home renovation without having to buy equipment I would only use once.",
  },
  {
    name: "Farhan Ahmed",
    rating: 5,
    comment:
      "The rental details were clear, the owner was helpful, and booking everything online saved me time.",
  },
  {
    name: "Nusrat Jahan",
    rating: 4,
    comment:
      "A practical way to find photography gear for a short project. I appreciated having flexible rental options.",
  },
  {
    name: "Imran Hossain",
    rating: 5,
    comment:
      "I could compare equipment and prices in one place and arrange a rental that fit my work schedule.",
  },
];

export default function CustomerReviews() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="customer-reviews-heading"
      className="bg-[#f0fdf4] px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#166534]">
            Customer reviews
          </p>
          <h2
            id="customer-reviews-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-[#102a24] sm:text-4xl"
          >
            Good gear. Good experiences.
          </h2>
          <p className="mt-4 text-base leading-7 text-[#52645a]">
            See how Equiply helps people find equipment for the work that
            matters to them.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
          {reviews.map((review, index) => (
            <motion.article
              key={review.name}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={
                shouldReduceMotion ? undefined : { opacity: 1, y: 0 }
              }
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="flex h-full flex-col rounded-2xl border border-[#dce9df] bg-white p-6 shadow-sm"
            >
              <div
                className="flex items-center gap-1 text-amber-500"
                aria-label={`${review.rating} out of 5 stars`}
              >
                {Array.from({ length: review.rating }, (_, starIndex) => (
                  <Star
                    key={starIndex}
                    aria-hidden="true"
                    size={17}
                    fill="currentColor"
                    strokeWidth={1.5}
                  />
                ))}
                <span className="ml-1 text-sm font-semibold text-[#52645a]">
                  {review.rating}.0
                </span>
              </div>

              <p className="mt-5 flex-1 text-sm leading-6 text-[#52645a]">
                &ldquo;{review.comment}&rdquo;
              </p>

              <div className="mt-6 border-t border-[#e8f0ea] pt-4">
                <p className="font-bold text-[#102a24]">{review.name}</p>
                <p className="mt-1 text-xs text-[#64756b]">Equiply customer</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
