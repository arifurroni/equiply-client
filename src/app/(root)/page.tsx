
import HeroBanner from "@/components/shared/HeroBanner";
import EquipmentCategories from "@/components/shared/EquipmentCategories";
import WhyChooseUs from "@/components/shared/WhyChooseUs";
import CustomerReviews from "@/components/shared/CustomerReviews";
import FeaturedEquipment from "@/components/shared/FeaturedEquipment";
import { getFeaturedEquipments } from "@/lib/api";
import type { TEquipment } from "@/types";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let equipments: TEquipment[] = [];
  let loadError: string | null = null;

  try {
    equipments = await getFeaturedEquipments();
  } catch (error) {
    console.error("Failed to load featured equipment:", error);
    loadError = "Featured equipment is temporarily unavailable.";
  }

  return (
    <div>
      <HeroBanner />
      <FeaturedEquipment equipments={equipments} loadError={loadError} />
      <EquipmentCategories />
      <WhyChooseUs />
      <CustomerReviews />
    </div>
  );
};
