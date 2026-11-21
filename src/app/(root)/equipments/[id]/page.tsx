import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, MapPin } from "lucide-react";

import { auth } from "@/lib/auth";
import { ApiError, getEquipmentById } from "@/lib/api";
import type { TEquipment } from "@/types";

export default async function EquipmentDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    redirect("/signin");
  }

  const { id } = await params;
  let equipment: TEquipment;

  try {
    equipment = await getEquipmentById(id);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }

    throw error;
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-semibold text-[#166534] hover:text-[#102a24]"
      >
        <ArrowLeft aria-hidden="true" size={16} />
        Back to home
      </Link>

      <article className="mt-6 grid gap-8 rounded-3xl border border-[#dce9df] bg-white p-5 shadow-sm sm:p-8 lg:grid-cols-2 lg:gap-10">
        <div className="relative aspect-4/3 overflow-hidden rounded-2xl bg-[#e8f7ed]">
          <Image
            src={equipment.image}
            alt={equipment.name}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col">
          <p className="text-sm font-bold uppercase tracking-wide text-[#166534]">
            {equipment.category}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#102a24] sm:text-4xl">
            {equipment.name}
          </h1>
          <p className="mt-4 flex items-center gap-2 text-sm text-[#64756b]">
            <MapPin aria-hidden="true" size={17} />
            {equipment.location}
          </p>

          <p className="mt-6 text-base leading-7 text-[#52645a]">
            {equipment.description}
          </p>

          <div className="mt-7 grid grid-cols-2 gap-4 rounded-2xl bg-[#f0fdf4] p-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#64756b]">
                Rental price
              </p>
              <p className="mt-1 text-lg font-bold text-[#166534]">
                ${equipment.rentalPrice}
                <span className="ml-1 text-sm font-medium capitalize text-[#52645a]">
                  / {equipment.rentalType}
                </span>
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#64756b]">
                Available quantity
              </p>
              <p className="mt-1 text-lg font-bold text-[#102a24]">
                {equipment.availableQuantity}
              </p>
            </div>
          </div>

          <section className="mt-7">
            <h2 className="text-lg font-bold text-[#102a24]">
              Rental terms and conditions
            </h2>
            <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-[#52645a]">
              {equipment.rentalTerms}
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
