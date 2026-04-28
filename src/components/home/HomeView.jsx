/* eslint-disable react/no-array-index-key */
"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { FiArrowLeft, FiChevronRight, FiMapPin, FiSliders, FiX } from "react-icons/fi";
import { MdOutlineDeliveryDining, MdOutlinePhoneIphone, MdOutlineStar } from "react-icons/md";
import { RiAppleFill, RiGooglePlayFill } from "react-icons/ri";

const cuisines = [
  {
    name: "Pizza",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Biryani",
    image:
      "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Burgers",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Bangladeshi",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Cakes",
    image:
      "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Fast Food",
    image:
      "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Cafe",
    image:
      "https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Rice Dishes",
    image:
      "https://images.unsplash.com/photo-1516684669134-de6f7c473a2a?auto=format&fit=crop&w=800&q=80",
  },
];

const dailyDeals = [
  {
    title: "Flat 60% off",
    subtitle: "With selected partners",
    image:
      "https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=1000&q=80",
    bgClass: "from-fuchsia-500 to-pink-500",
  },
  {
    title: "50% off",
    subtitle: "Weekend favorites",
    image:
      "https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=1000&q=80",
    bgClass: "from-orange-500 to-amber-400",
  },
  {
    title: "Exclusive treats",
    subtitle: "Only in the app",
    image:
      "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=1000&q=80",
    bgClass: "from-rose-500 to-pink-400",
  },
  {
    title: "Dealnao",
    subtitle: "Tk 150 off this week",
    image:
      "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=1000&q=80",
    bgClass: "from-violet-500 to-fuchsia-500",
  },
];

const featuredRestaurants = [
  {
    name: "Ma Biryani - Gulshan",
    category: "Rice, Biryani",
    eta: "25 min",
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1000&q=80",
  },
  {
    name: "Rice on Fire",
    category: "Asian, Rice Bowl",
    eta: "30 min",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=80",
  },
  {
    name: "Shawarma N Kebab",
    category: "Middle Eastern",
    eta: "35 min",
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=1000&q=80",
  },
  {
    name: "Arrowhead Grill",
    category: "BBQ, Grill",
    eta: "30 min",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80",
  },
];

const dealNaoRestaurants = [
  {
    name: "AArash",
    category: "Bangladeshi",
    eta: "18 min",
    rating: 4.2,
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1000&q=80",
  },
  {
    name: "Burger Xpress",
    category: "Burger",
    eta: "20 min",
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=1000&q=80",
  },
  {
    name: "Sultan's Dine",
    category: "Biryani, Grill",
    eta: "26 min",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&w=1000&q=80",
  },
  {
    name: "Bhoj Fry",
    category: "Fast Food",
    eta: "24 min",
    rating: 4.1,
    image:
      "https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&w=1000&q=80",
  },
];

const fastDeliveryRestaurants = [
  {
    name: "Care Cafe",
    category: "Cafe, Bakery",
    eta: "15 min",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1000&q=80",
  },
  {
    name: "Kacchi Bhai",
    category: "Bangladeshi",
    eta: "17 min",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1604909052743-94e838986d24?auto=format&fit=crop&w=1000&q=80",
  },
  {
    name: "Burger Xpress",
    category: "Burgers",
    eta: "19 min",
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=1000&q=80",
  },
  {
    name: "Leto Food",
    category: "Snacks",
    eta: "20 min",
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=1000&q=80",
  },
];

const topBrands = [
  { name: "Kacchi Bhai", colorClass: "bg-red-500" },
  { name: "Burger Xpress", colorClass: "bg-blue-500" },
  { name: "Sultan's Dine", colorClass: "bg-black" },
  { name: "KFC", colorClass: "bg-red-600" },
  { name: "Care Cafe", colorClass: "bg-emerald-600" },
  { name: "Leto Food", colorClass: "bg-orange-600" },
];

const allRestaurants = [
  ...featuredRestaurants,
  ...dealNaoRestaurants,
  ...fastDeliveryRestaurants,
];

const cuisineMap = {
  Pizza: ["pizza"],
  Biryani: ["biryani"],
  Burgers: ["burger"],
  Bangladeshi: ["bangladeshi"],
  Cakes: ["cake", "bakery"],
  "Fast Food": ["fast food", "snacks", "shawarma"],
  Cafe: ["cafe", "bakery"],
  "Rice Dishes": ["rice", "rice bowl"],
};

const dealMap = {
  "Flat 60% off": ["burger", "pizza", "fast food"],
  "50% off": ["biryani", "rice", "asian"],
  "Exclusive treats": ["cafe", "bakery", "snacks"],
  Dealnao: ["bangladeshi", "grill", "shawarma"],
};

function SectionTitle({ title, actionLabel = "See all" }) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <h2 className="text-xl font-semibold tracking-tight text-brand-dark sm:text-2xl">
        {title}
      </h2>
      <button
        type="button"
        className="inline-flex items-center gap-1 rounded-full border border-brand-secondary/80 px-3 py-1.5 text-sm font-medium text-brand-muted transition-colors hover:border-brand-primary hover:text-brand-dark"
      >
        {actionLabel}
        <FiChevronRight className="text-base" />
      </button>
    </div>
  );
}

function RestaurantCard({ restaurant, className = "" }) {
  return (
    <article
      className={`overflow-hidden rounded-2xl border border-black/5 bg-white shadow-[0_8px_20px_-16px_rgba(0,0,0,0.45)] ${className}`}
    >
      <div className="relative h-36 overflow-hidden sm:h-40">
        <Image
          src={restaurant.image}
          alt={restaurant.name}
          fill
          className="object-cover transition duration-300 hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="space-y-2 px-3.5 py-3">
        <h3 className="truncate text-[0.95rem] font-semibold text-brand-dark">
          {restaurant.name}
        </h3>
        <p className="truncate text-xs text-brand-muted sm:text-sm">{restaurant.category}</p>
        <div className="flex items-center justify-between text-xs text-brand-muted sm:text-sm">
          <span className="inline-flex items-center gap-1">
            <MdOutlineDeliveryDining className="text-base" />
            {restaurant.eta}
          </span>
          <span className="inline-flex items-center gap-1 font-medium text-brand-dark">
            <MdOutlineStar className="text-brand-primary" />
            {restaurant.rating}
          </span>
        </div>
      </div>
    </article>
  );
}

function buildCuisineResults(restaurants, selectedCuisine) {
  const keywords = cuisineMap[selectedCuisine] || [];
  const normalizedKeywords = keywords.map((item) => item.toLowerCase());

  const filtered = restaurants.filter((restaurant) => {
    const haystack = `${restaurant.name} ${restaurant.category}`.toLowerCase();
    return normalizedKeywords.some((keyword) => haystack.includes(keyword));
  });

  const base = filtered.length > 0 ? filtered : restaurants;

  return Array.from({ length: 4 }).flatMap((_, index) =>
    base.map((restaurant, itemIndex) => ({
      ...restaurant,
      id: `${restaurant.name}-${index}-${itemIndex}`,
    })),
  );
}

function buildDealResults(restaurants, selectedDealTitle) {
  const keywords = dealMap[selectedDealTitle] || [];
  const normalizedKeywords = keywords.map((item) => item.toLowerCase());

  const filtered = restaurants.filter((restaurant) => {
    if (!normalizedKeywords.length) return true;
    const haystack = `${restaurant.name} ${restaurant.category}`.toLowerCase();
    return normalizedKeywords.some((keyword) => haystack.includes(keyword));
  });

  const base = filtered.length > 0 ? filtered : restaurants;

  return Array.from({ length: 7 }).flatMap((_, index) =>
    base.map((restaurant, itemIndex) => ({
      ...restaurant,
      id: `${selectedDealTitle}-${restaurant.name}-${index}-${itemIndex}`,
    })),
  );
}

function AppPromoCard() {
  return (
    <section className="overflow-hidden rounded-3xl bg-[#ffe6ec] p-5 sm:p-6">
      <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_180px] md:items-center">
        <div>
          <h3 className="text-xl font-semibold text-brand-dark sm:text-2xl">
            Unlock exclusive deals and more in our mobile app
          </h3>
          <p className="mt-2 max-w-xl text-sm text-brand-muted sm:text-base">
            Meal for one, full checkout, food and grocery deals; get all in one
            place with faster reorder and app-only discounts.
          </p>
          <div className="mt-4 flex flex-wrap gap-2.5">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg bg-black px-3.5 py-2 text-sm font-medium text-white"
            >
              <RiAppleFill className="text-base" />
              App Store
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg bg-black px-3.5 py-2 text-sm font-medium text-white"
            >
              <RiGooglePlayFill className="text-base" />
              Play Store
            </button>
          </div>
        </div>
        <div className="relative hidden h-36 md:block">
          <Image
            src="https://images.unsplash.com/photo-1586880244406-556ebe35f282?auto=format&fit=crop&w=900&q=80"
            alt="Order food from app"
            fill
            className="rounded-2xl object-cover"
          />
        </div>
      </div>
    </section>
  );
}

function FilterSidebar() {
  return (
    <aside className="hidden space-y-4 lg:sticky lg:top-28 lg:block lg:h-fit">
      <section className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm">
        <div className="mb-4 flex items-center gap-2 text-brand-dark">
          <FiSliders className="text-lg text-brand-primary" />
          <h2 className="text-lg font-semibold">Filters</h2>
        </div>

        <div className="space-y-5">
          <section>
            <h3 className="mb-2 text-sm font-semibold text-brand-dark">Sort by</h3>
            <div className="space-y-2 text-sm text-brand-muted">
              {["Relevance", "Fastest delivery", "Distance", "Top rated"].map((option) => (
                <label key={option} className="flex items-center gap-2.5">
                  <input
                    type="radio"
                    name="sort"
                    className="h-4 w-4 border-brand-secondary text-brand-primary focus:ring-brand-primary"
                    defaultChecked={option === "Relevance"}
                  />
                  {option}
                </label>
              ))}
            </div>
          </section>

          <section>
            <h3 className="mb-2 text-sm font-semibold text-brand-dark">Quick filters</h3>
            <div className="flex flex-wrap gap-2">
              {["Free delivery", "Discounts", "Top rated", "Pick-up"].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  className="rounded-full border border-brand-secondary/80 px-3 py-1.5 text-xs font-medium text-brand-muted transition-colors hover:border-brand-primary hover:text-brand-dark"
                >
                  {tag}
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-xl bg-brand-secondary/20 p-3">
            <h3 className="text-sm font-semibold text-brand-dark">Delivery address</h3>
            <p className="mt-1 flex items-start gap-2 text-sm text-brand-muted">
              <FiMapPin className="mt-0.5 shrink-0 text-brand-primary" />
              New address, Gulshan Avenue, Dhaka
            </p>
          </section>
        </div>
      </section>

      <section className="rounded-2xl bg-[#2c2c2c] p-4 text-white shadow-sm">
        <p className="text-xs uppercase tracking-wide text-white/70">Unlock more in app</p>
        <h3 className="mt-1 text-sm font-semibold leading-snug">
          Download now for better offers daily
        </h3>
        <button
          type="button"
          className="mt-3 inline-flex items-center gap-2 rounded-lg bg-white/15 px-3 py-2 text-xs font-medium"
        >
          <MdOutlinePhoneIphone className="text-sm" />
          Download app
        </button>
      </section>
    </aside>
  );
}

function RestaurantRow({ title, data }) {
  return (
    <section>
      <SectionTitle title={title} />
      <div className="grid grid-flow-col auto-cols-[78%] gap-3 overflow-x-auto pb-1 sm:auto-cols-[45%] lg:grid-flow-row lg:grid-cols-4 lg:overflow-visible">
        {data.map((restaurant) => (
          <RestaurantCard key={`${title}-${restaurant.name}`} restaurant={restaurant} />
        ))}
      </div>
    </section>
  );
}

function CuisineResultsView({ selectedCuisine, results, onResetCuisine }) {
  return (
    <section className="space-y-5">
      <div className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={onResetCuisine}
            className="inline-flex items-center gap-2 rounded-full border border-brand-secondary/90 px-3 py-2 text-sm font-medium text-brand-muted transition-colors hover:border-brand-primary hover:text-brand-dark"
          >
            <FiArrowLeft />
            Back to home feed
          </button>
          <span className="rounded-full bg-brand-secondary/35 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-dark">
            Cuisine: {selectedCuisine}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold text-brand-dark sm:text-2xl">
              {results.length}+ restaurants for {selectedCuisine}
            </h2>
            <p className="mt-1 text-sm text-brand-muted">
              Explore popular places near your selected delivery location.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {["Relevance", "Fastest", "Rating 4.5+", "Deals"].map((item) => (
              <button
                key={item}
                type="button"
                className="rounded-full border border-brand-secondary/80 px-3 py-1.5 text-xs font-semibold text-brand-muted transition-colors hover:border-brand-primary hover:text-brand-dark"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {results.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            restaurant={restaurant}
            className="h-full [&>div:first-child]:h-32 sm:[&>div:first-child]:h-36"
          />
        ))}
      </div>
    </section>
  );
}

function DealCampaignView({ selectedDeal, results, onResetDeal }) {
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
              src={selectedDeal?.image || dailyDeals[0].image}
              alt={selectedDeal?.title || "Daily deal banner"}
              fill
              className="rounded-2xl object-cover"
            />
          </div>
        </div>

        <div className="border-t border-black/5 px-4 py-3 sm:px-5">
          <div className="flex flex-wrap gap-2">
            {["Sort: Relevance", "Fastest delivery", "Top rated", "Free delivery"].map(
              (chip) => (
                <button
                  key={chip}
                  type="button"
                  className="rounded-full border border-brand-secondary/80 px-3 py-1.5 text-xs font-semibold text-brand-muted transition-colors hover:border-brand-primary hover:text-brand-dark"
                >
                  {chip}
                </button>
              ),
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {results.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            restaurant={restaurant}
            className="h-full [&>div:first-child]:h-28 sm:[&>div:first-child]:h-32"
          />
        ))}
      </div>
    </section>
  );
}

export default function HomeView() {
  const [selectedCuisine, setSelectedCuisine] = useState(null);
  const [selectedDealTitle, setSelectedDealTitle] = useState(null);

  const cuisineResults = useMemo(() => {
    if (!selectedCuisine) return [];
    return buildCuisineResults(allRestaurants, selectedCuisine);
  }, [selectedCuisine]);

  const selectedDeal = useMemo(
    () => dailyDeals.find((deal) => deal.title === selectedDealTitle) || null,
    [selectedDealTitle],
  );

  const dealResults = useMemo(() => {
    if (!selectedDealTitle) return [];
    return buildDealResults(allRestaurants, selectedDealTitle);
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
          <FilterSidebar />

          <div className="min-w-0 space-y-8">
            <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-brand-secondary/75 via-rose-100 to-pink-100 p-5 shadow-sm sm:p-7">
              <div className="grid items-center gap-5 md:grid-cols-[minmax(0,1fr)_220px]">
                <div>
                  <h1 className="max-w-xl text-2xl font-bold leading-tight text-brand-dark sm:text-3xl">
                    Sign up for free delivery on your first order
                  </h1>
                  <p className="mt-2 max-w-lg text-sm text-brand-muted sm:text-base">
                    Explore top-rated local favorites with curated deals and faster
                    checkout across your nearby restaurants.
                  </p>
                  <button
                    type="button"
                    className="mt-4 rounded-full bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  >
                    Sign up
                  </button>
                </div>
                <div className="hidden md:block">
                  <Image
                    src="https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=900&q=80"
                    alt="Featured meal"
                    width={440}
                    height={300}
                    className="h-44 w-full rounded-2xl object-cover"
                  />
                </div>
              </div>
            </section>

            <section>
              <SectionTitle
                title="Cuisines"
                actionLabel={selectedCuisine ? "Selected" : "Explore"}
              />
              <div className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-1">
                {cuisines.map((cuisine) => (
                  <button
                    key={cuisine.name}
                    type="button"
                    onClick={() => onCuisineSelect(cuisine.name)}
                    className="group shrink-0 text-center"
                    aria-pressed={selectedCuisine === cuisine.name}
                  >
                    <Image
                      src={cuisine.image}
                      alt={cuisine.name}
                      width={90}
                      height={90}
                      className={`h-20 w-20 rounded-full object-cover ring-2 transition sm:h-24 sm:w-24 ${
                        selectedCuisine === cuisine.name
                          ? "ring-brand-primary"
                          : "ring-transparent group-hover:ring-brand-primary"
                      }`}
                      loading="lazy"
                    />
                    <span
                      className={`mt-2 block text-xs font-medium sm:text-sm ${
                        selectedCuisine === cuisine.name
                          ? "text-brand-dark"
                          : "text-brand-muted group-hover:text-brand-dark"
                      }`}
                    >
                      {cuisine.name}
                    </span>
                  </button>
                ))}
              </div>
            </section>

            {selectedDealTitle ? (
              <DealCampaignView
                selectedDeal={selectedDeal}
                results={dealResults}
                onResetDeal={onResetDeal}
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
                <section>
                  <SectionTitle title="Your daily deals" />
                  <div className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-1">
                    {dailyDeals.map((deal) => (
                      <button
                        key={deal.title}
                        type="button"
                        onClick={() => onDealSelect(deal.title)}
                        className={`min-w-[240px] shrink-0 overflow-hidden rounded-2xl bg-gradient-to-r ${deal.bgClass} p-4 text-white shadow-sm sm:min-w-[280px]`}
                      >
                        <div className="grid grid-cols-[1fr_72px] items-center gap-3 sm:grid-cols-[1fr_80px]">
                          <div>
                            <h3 className="text-base font-semibold sm:text-lg">{deal.title}</h3>
                            <p className="text-xs text-white/90 sm:text-sm">{deal.subtitle}</p>
                          </div>
                          <Image
                            src={deal.image}
                            alt={deal.title}
                            width={80}
                            height={80}
                            className="h-16 w-16 rounded-full object-cover ring-2 ring-white/60 sm:h-20 sm:w-20"
                            loading="lazy"
                          />
                        </div>
                      </button>
                    ))}
                  </div>
                </section>

                <RestaurantRow title="Flat 15% off entire menu" data={featuredRestaurants} />
                <RestaurantRow title="DEALNAO : Tk 150 off" data={dealNaoRestaurants} />

                <section>
                  <SectionTitle title="Top brands" actionLabel="View all" />
                  <div className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-1">
                    {topBrands.map((brand) => (
                      <button
                        key={brand.name}
                        type="button"
                        className="flex shrink-0 items-center gap-2 rounded-xl border border-black/5 bg-white px-3 py-2.5 text-sm font-medium text-brand-dark shadow-sm transition-colors hover:border-brand-primary hover:text-brand-primary"
                      >
                        <span
                          className={`grid h-8 w-8 place-items-center rounded-full text-[11px] font-bold text-white ${brand.colorClass}`}
                        >
                          {brand.name.slice(0, 2).toUpperCase()}
                        </span>
                        {brand.name}
                      </button>
                    ))}
                  </div>
                </section>

                <RestaurantRow title="Fast delivery" data={fastDeliveryRestaurants} />
                <AppPromoCard />

                <section>
                  <SectionTitle title="All restaurants" actionLabel="Browse all" />
                  <div className="grid grid-flow-col auto-cols-[78%] gap-3 overflow-x-auto pb-1 sm:auto-cols-[45%] xl:grid-flow-row xl:grid-cols-3 xl:overflow-visible">
                    {allRestaurants.map((restaurant, index) => (
                      <RestaurantCard
                        key={`all-${restaurant.name}-${index}`}
                        restaurant={restaurant}
                        className="xl:[&>div:first-child]:h-44"
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
