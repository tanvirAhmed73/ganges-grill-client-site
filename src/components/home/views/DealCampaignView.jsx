import Image from "next/image";
import { FiArrowLeft } from "react-icons/fi";
import RestaurantCard from "@/components/home/sections/RestaurantCard";

export default function DealCampaignView({
  selectedDeal,
  results,
  onResetDeal,
  serviceMode = "delivery",
}) {
  return (
    <section className="space-y-5">
      <div className="overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm">
        <div className="grid gap-4 bg-gradient-to-r from-fuchsia-500 via-pink-500 to-rose-400 p-5 text-white sm:p-6 md:grid-cols-[minmax(0,1fr)_220px] md:items-center">
          <div>
            <p className="inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
              Campaign deal
            </p>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">{selectedDeal?.title}</h2>
            <p className="mt-2 text-sm text-white/90 sm:text-base">{selectedDeal?.subtitle}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={onResetDeal}
                className="inline-flex items-center gap-2 rounded-full border border-white/70 px-3.5 py-2 text-xs font-semibold uppercase tracking-wide transition-colors hover:bg-white/15"
              >
                <FiArrowLeft />
                Back to home feed
              </button>
              <span className="rounded-full bg-white/25 px-3.5 py-2 text-xs font-semibold uppercase tracking-wide">
                {results.length}+ items
              </span>
            </div>
          </div>
          <div className="relative hidden h-36 md:block">
            <Image
              src={selectedDeal?.image}
              alt={selectedDeal?.title || "Daily deal banner"}
              fill
              className="rounded-2xl object-cover"
            />
          </div>
        </div>

        <div className="border-t border-black/5 px-4 py-3 sm:px-5">
          <div className="flex flex-wrap gap-2">
            {(serviceMode === "pickup"
              ? ["Sort: Relevance", "Distance", "Top rated", "Deals"]
              : ["Sort: Relevance", "Fastest delivery", "Top rated", "Free delivery"]
            ).map((chip) => (
              <button
                key={chip}
                type="button"
                className="rounded-full border border-brand-secondary/80 px-3 py-1.5 text-xs font-semibold text-brand-muted transition-colors hover:border-brand-primary hover:text-brand-dark"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {results.map((restaurant, index) => (
          <RestaurantCard
            key={restaurant.id}
            restaurant={restaurant}
            className="h-full [&>div:first-child]:h-28 sm:[&>div:first-child]:h-32"
            serviceMode={serviceMode}
            listIndex={index}
          />
        ))}
      </div>
    </section>
  );
}
