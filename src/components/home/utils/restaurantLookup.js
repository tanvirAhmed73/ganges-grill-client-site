import {
  featuredRestaurants,
  dealNaoRestaurants,
  fastDeliveryRestaurants,
} from "@/components/home/data/homeData";

/** Flat list with stable slugs — used for `/restaurant/[slug]` resolution */
export function getAllRestaurantsForLookup() {
  return [
    ...featuredRestaurants,
    ...dealNaoRestaurants,
    ...fastDeliveryRestaurants,
  ];
}

export function getRestaurantBySlug(slug) {
  if (!slug || typeof slug !== "string") return null;
  const decoded = decodeURIComponent(slug);
  return (
    getAllRestaurantsForLookup().find((r) => r.slug === decoded) ?? null
  );
}
