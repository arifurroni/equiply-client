"use client";

import { useSession } from "@/lib/auth-client";
import type { TEquipment } from "@/types";
import EquipmentCard from "./EquipmentCard";

export default function EquipmentGrid({
  equipments,
}: {
  equipments: TEquipment[];
}) {
  const { data: session, isPending } = useSession();

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {equipments.map((equipment) => (
        <EquipmentCard
          key={equipment._id}
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
      ))}
    </div>
  );
}
