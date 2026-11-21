import Image from "next/image";
import { ImageOff } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { TEquipment, TEquipmentCondition } from "@/types";

const conditionLabels: Record<TEquipmentCondition, string> = {
  new: "New",
  "like-new": "Like New",
  good: "Good",
  fair: "Fair",
  poor: "Poor",
};

type EquipmentsTableProps = {
  equipments: TEquipment[];
};

export default function EquipmentsTable({ equipments }: EquipmentsTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#dce9df] bg-white shadow-sm">
      <Table>
        <TableHeader className="bg-[#f0fdf4]">
          <TableRow className="border-[#dce9df] hover:bg-transparent">
            <TableHead className="text-[#102a24]">Image</TableHead>
            <TableHead className="text-[#102a24]">Equipment</TableHead>
            <TableHead className="text-[#102a24]">Category</TableHead>
            <TableHead className="text-[#102a24]">Location</TableHead>
            <TableHead className="text-[#102a24]">Price</TableHead>
            <TableHead className="text-[#102a24]">Qty</TableHead>
            <TableHead className="text-[#102a24]">Condition</TableHead>
            <TableHead className="text-[#102a24]">Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {equipments.map((equipment) => (
            <TableRow key={equipment._id} className="border-[#dce9df]">
              {/* Image */}
              <TableCell>
                {equipment.image ? (
                  <Image
                    src={equipment.image}
                    alt={equipment.name}
                    width={48}
                    height={48}
                    className="size-12 rounded-lg border border-[#dce9df] object-cover"
                  />
                ) : (
                  <div className="flex size-12 items-center justify-center rounded-lg bg-[#f0fdf4] text-[#64756b]">
                    <ImageOff aria-hidden="true" size={18} />
                  </div>
                )}
              </TableCell>

              {/* Name + brand/model */}
              <TableCell>
                <p className="font-semibold text-[#102a24]">{equipment.name}</p>
                <p className="text-xs text-[#64756b]">
                  {equipment.brand} {equipment.model}
                </p>
              </TableCell>

              <TableCell className="text-[#52645a]">
                {equipment.category}
              </TableCell>

              <TableCell className="text-[#52645a]">
                {equipment.location}
              </TableCell>

              {/* Price per rental type */}
              <TableCell className="font-semibold text-[#166534]">
                ${equipment.rentalPrice}
                <span className="text-xs font-normal text-[#64756b]">
                  {" "}
                  / {equipment.rentalType}
                </span>
              </TableCell>

              <TableCell className="text-[#52645a]">
                {equipment.availableQuantity}
              </TableCell>

              <TableCell className="text-[#52645a]">
                {conditionLabels[equipment.condition] ?? equipment.condition}
              </TableCell>

              {/* Status badge */}
              <TableCell>
                {equipment.status === "active" ? (
                  <Badge
                    variant="outline"
                    className="border-[#dce9df] bg-[#f0fdf4] text-[#166534]"
                  >
                    Active
                  </Badge>
                ) : (
                  <Badge
                    variant="outline"
                    className="border-gray-200 bg-gray-50 text-gray-500"
                  >
                    Inactive
                  </Badge>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
