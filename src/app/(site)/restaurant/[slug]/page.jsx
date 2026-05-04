import RestaurantDetailView from "@/components/home/RestaurantDetailView";
import { getRestaurantBySlug } from "@/components/home/utils/restaurantLookup";

export function generateMetadata({ params }) {
  const r = getRestaurantBySlug(params.slug);
  return {
    title: r?.name ?? "Restaurant",
    description: r
      ? `${r.name} — ${r.category}. Order on Ganges Grill.`
      : "Restaurant listing",
  };
}

export default function RestaurantPage() {
  return <RestaurantDetailView />;
}
