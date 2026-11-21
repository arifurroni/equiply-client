import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

import type { TEquipment } from "@/types";

export default function EquipmentCard({
  equipment,
  detailsHref,
  sessionPending,
}: {
  equipment: TEquipment;
  detailsHref: string | null;
  sessionPending: boolean;
}) {
  const isAvailable = equipment.status === "active";

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-[#dce9df] bg-white shadow-sm transition-shadow hover:shadow-md">
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
            <h2 className="mt-1 line-clamp-2 text-lg font-bold text-[#102a24]">
              {equipment.name}
            </h2>
          </div>
          <div className="shrink-0 text-right">
            <p className="font-bold text-[#166534]">${equipment.rentalPrice}</p>
            <p className="text-xs capitalize text-[#64756b]">
              per {equipment.rentalType}
            </p>
          </div>
        </div>

        <p className="mt-3 flex items-center gap-1.5 text-sm text-[#64756b]">
          <MapPin aria-hidden="true" size={15} />
          {equipment.location}
        </p>

        <div className="mt-3">
          <span
            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
              isAvailable
                ? "bg-[#e8f7ed] text-[#166534]"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {isAvailable ? "Available" : "Unavailable"}
          </span>
        </div>

        <div className="mt-auto pt-5">
          {sessionPending ? (
            <span
              aria-disabled="true"
              className="inline-flex h-10 w-full cursor-wait items-center justify-center rounded-xl bg-[#166534]/70 px-4 text-sm font-semibold text-white"
            >
              Checking sign-in...
            </span>
          ) : detailsHref ? (
            <Link
              href={detailsHref}
              className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-[#166534] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#102a24] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#166534]"
            >
              View Details
              <ArrowRight aria-hidden="true" size={16} />
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}
