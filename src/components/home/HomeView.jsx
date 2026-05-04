/* eslint-disable react/no-array-index-key */
"use client";

import { useMemo, useState } from "react";
import { FiX } from "react-icons/fi";
import {
  allRestaurants,
  cuisineMap,
  cuisines,
  dailyDeals,
  dealMap,
  dealNaoRestaurants,
  fastDeliveryRestaurants,
  featuredRestaurants,
  topBrands,
} from "@/components/home/data/homeData";
import AppPromoCard from "@/components/home/sections/AppPromoCard";
import CuisinesSection from "@/components/home/sections/CuisinesSection";
import DailyDealsSection from "@/components/home/sections/DailyDealsSection";
import FilterSidebar from "@/components/home/sections/FilterSidebar";
import HeroSection from "@/components/home/sections/HeroSection";
import RestaurantCard from "@/components/home/sections/RestaurantCard";
import RestaurantRow from "@/components/home/sections/RestaurantRow";
import SectionTitle from "@/components/home/sections/SectionTitle";
import TopBrandsSection from "@/components/home/sections/TopBrandsSection";
import { buildCuisineResults, buildDealResults } from "@/components/home/utils/homeViewData";
import CuisineResultsView from "@/components/home/views/CuisineResultsView";
import DealCampaignView from "@/components/home/views/DealCampaignView";

/** @param {{ serviceMode?: 'delivery' | 'pickup' }} props */
export default function HomeView({ serviceMode = "delivery" }) {
  const isPickup = serviceMode === "pickup";
  const [selectedCuisine, setSelectedCuisine] = useState(null);
  const [selectedDealTitle, setSelectedDealTitle] = useState(null);

  const cuisineResults = useMemo(() => {
    if (!selectedCuisine) return [];
    return buildCuisineResults(allRestaurants, selectedCuisine, cuisineMap);
  }, [selectedCuisine]);

  const selectedDeal = useMemo(
    () => dailyDeals.find((deal) => deal.title === selectedDealTitle) || null,
    [selectedDealTitle],
  );

  const dealResults = useMemo(() => {
    if (!selectedDealTitle) return [];
    return buildDealResults(allRestaurants, selectedDealTitle, dealMap);
  }, [selectedDealTitle]);

  const onCuisineSelect = (cuisineName) => {
    setSelectedDealTitle(null);
    setSelectedCuisine(cuisineName);

    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const onResetCuisine = () => {
    setSelectedCuisine(null);
  };

  const onDealSelect = (dealTitle) => {
    setSelectedCuisine(null);
    setSelectedDealTitle(dealTitle);

    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const onResetDeal = () => {
    setSelectedDealTitle(null);
  };

  return (
    <main className="bg-brand-background pb-10">
      <div className="mx-auto max-w-[1340px] px-3 py-5 sm:px-4 lg:px-6 lg:py-8">
        <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)] xl:gap-8">
          <FilterSidebar serviceMode={serviceMode} />

          <div className="min-w-0 space-y-8">
            <HeroSection variant={isPickup ? "pickup" : "delivery"} />

            <CuisinesSection
              cuisines={cuisines}
              selectedCuisine={selectedCuisine}
              onCuisineSelect={onCuisineSelect}
            />

            {selectedDealTitle ? (
              <DealCampaignView
                selectedDeal={selectedDeal || dailyDeals[0]}
                results={dealResults}
                onResetDeal={onResetDeal}
                serviceMode={serviceMode}
              />
            ) : selectedCuisine ? (
              <>
                <div className="flex items-center justify-end">
                  <button
                    type="button"
                    onClick={onResetCuisine}
                    className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs font-semibold text-brand-muted transition-colors hover:border-brand-primary hover:text-brand-dark"
                  >
                    <FiX className="text-sm" />
                    Clear cuisine filter
                  </button>
                </div>
                <CuisineResultsView
                  selectedCuisine={selectedCuisine}
                  results={cuisineResults}
                  onResetCuisine={onResetCuisine}
                />
              </>
            ) : (
              <>
                <DailyDealsSection dailyDeals={dailyDeals} onDealSelect={onDealSelect} />

                <RestaurantRow
                  title="Flat 15% off entire menu"
                  data={featuredRestaurants}
                  serviceMode={serviceMode}
                />
                <RestaurantRow
                  title="DEALNAO : Tk 150 off"
                  data={dealNaoRestaurants}
                  serviceMode={serviceMode}
                />
                <TopBrandsSection topBrands={topBrands} />
                <RestaurantRow
                  title={isPickup ? "Nearest for pick-up" : "Fast delivery"}
                  data={fastDeliveryRestaurants}
                  serviceMode={serviceMode}
                />
                <AppPromoCard />

                <section>
                  <SectionTitle
                    title="All restaurants"
                    actionLabel="Browse all"
                    actionHref="/order/popular"
                  />
                  <div className="grid grid-flow-col auto-cols-[78%] gap-3 overflow-x-auto pb-1 sm:auto-cols-[45%] xl:grid-flow-row xl:grid-cols-3 xl:overflow-visible">
                    {allRestaurants.map((restaurant, index) => (
                      <RestaurantCard
                        key={`all-${restaurant.name}-${index}`}
                        restaurant={restaurant}
                        className="xl:[&>div:first-child]:h-44"
                        serviceMode={serviceMode}
                        listIndex={index}
                      />
                    ))}
                  </div>
                </section>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
