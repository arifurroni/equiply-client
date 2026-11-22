import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Compass, Handshake, Lightbulb } from "lucide-react";

export const metadata: Metadata = {
  title: "About Equiply",
  description:
    "Learn how Equiply brings equipment owners and renters together.",
};

const principles = [
  {
    title: "Access over ownership",
    description:
      "Help people find equipment for the work at hand without needing to buy every item themselves.",
    icon: Compass,
  },
  {
    title: "A useful marketplace",
    description:
      "Bring equipment listings and the people looking for them together in one place.",
    icon: Handshake,
  },
  {
    title: "Built around real projects",
    description:
      "Make it easier to explore equipment for work, creative ideas, and everyday needs.",
    icon: Lightbulb,
  },
];

export default function AboutPage() {
  return (
    <main>
      <section className="relative isolate overflow-hidden bg-[#f0fdf4] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-32 size-96 rounded-full bg-[#6ee7a5]/20 blur-3xl"
        />
        <div className="relative mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#166534]">
            About Equiply
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-[#102a24] sm:text-5xl">
            The right equipment can move an idea forward.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-[#52645a] sm:text-lg sm:leading-8">
            Equiply is an equipment rental marketplace built to connect people
            who have useful gear with people who need it for a project, a
            business, or a one-time task.
          </p>
          <Link
            href="/equipments"
            className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#166534] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#102a24] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#166534]"
          >
            Explore equipment
            <ArrowRight aria-hidden="true" size={18} />
          </Link>
        </div>
      </section>

      <section
        aria-labelledby="about-mission-heading"
        className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#166534]">
              Our purpose
            </p>
            <h2
              id="about-mission-heading"
              className="mt-3 text-3xl font-bold tracking-tight text-[#102a24] sm:text-4xl"
            >
              Make finding equipment more straightforward.
            </h2>
            <p className="mt-4 text-base leading-7 text-[#52645a]">
              From construction tools to cameras and event gear, Equiply helps
              renters explore listings and compare the details that matter.
              Owners can share their equipment with a wider community.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {principles.map((principle) => {
              const Icon = principle.icon;

              return (
                <article
                  key={principle.title}
                  className="rounded-2xl border border-[#dce9df] bg-[#fbfefc] p-6 shadow-sm"
                >
                  <span className="flex size-12 items-center justify-center rounded-xl bg-[#e8f7ed] text-[#166534]">
                    <Icon aria-hidden="true" size={23} strokeWidth={1.8} />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-[#102a24]">
                    {principle.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#52645a]">
                    {principle.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
