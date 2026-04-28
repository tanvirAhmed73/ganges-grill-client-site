"use client";

import { useSearchParams } from "next/navigation";
import HomeView from "@/components/home/HomeView";

/**
 * `/` is the default **Delivery** marketplace. `/?service=pickup` is **Pick-up**.
 */
export default function HomePageClient() {
  const searchParams = useSearchParams();
  const isPickup = searchParams.get("service") === "pickup";
  const serviceMode = isPickup ? "pickup" : "delivery";

  return <HomeView serviceMode={serviceMode} />;
}
