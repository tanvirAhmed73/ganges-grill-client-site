import RestaurantCard from "@/components/home/sections/RestaurantCard";
import { allRestaurants } from "@/components/home/data/homeData";
import MarketingShell from "@/components/marketing/MarketingShell";

export const metadata = {
  title: "All restaurants",
};

export default function AllRestaurantsPage() {
  const count = allRestaurants.length;

  return (
    <MarketingShell
      wide
      sheet={false}
      eyebrow="Discover"
      title="All restaurants"
      intro="Partner kitchens delivering across Dhaka. Ratings and ETAs are indicative — traffic and prep times may vary."
    >
      <div className="flex flex-col gap-4 rounded-2xl border border-black/[0.06] bg-white px-5 py-4 shadow-sm ring-1 ring-black/[0.03] sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-brand-dark">
            {count} partner {count === 1 ? "spot" : "spots"} live on Ganges Grill
          </p>
          <p className="mt-0.5 text-sm text-brand-muted">
            Tap a card to open the restaurant menu and order.
          </p>
        </div>
        <span className="inline-flex w-fit shrink-0 items-center rounded-full bg-brand-secondary/40 px-4 py-2 text-xs font-bold uppercase tracking-wide text-brand-dark">
          Updated regularly
        </span>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {allRestaurants.map((restaurant, index) => (
          <RestaurantCard
            key={`${restaurant.slug}-${index}`}
            restaurant={restaurant}
            className="h-full transition hover:-translate-y-0.5"
            listIndex={index}
          />
        ))}
      </div>
    </MarketingShell>
  );
}
