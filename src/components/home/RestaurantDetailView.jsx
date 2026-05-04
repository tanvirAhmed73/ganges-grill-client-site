"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { FaWalking } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import { AiOutlineShopping } from "react-icons/ai";
import { MdOutlineDeliveryDining, MdOutlineStar } from "react-icons/md";
import RestaurantMenu from "@/components/restaurant/RestaurantMenu";
import { getRestaurantBySlug } from "@/components/home/utils/restaurantLookup";

export default function RestaurantDetailView() {
  const params = useParams();
  const router = useRouter();
  const slug = typeof params?.slug === "string" ? params.slug : "";
  const restaurant = getRestaurantBySlug(slug);

  if (!restaurant) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <h1 className="text-xl font-bold text-brand-dark">Restaurant not found</h1>
        <p className="mt-2 text-sm text-brand-muted">
          This listing may have moved. Browse the home page to pick another place.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl bg-brand-primary px-6 py-2.5 text-sm font-semibold text-white"
        >
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-brand-background pb-6">
      {/* Hero */}
      <div className="relative h-[min(38vh,300px)] w-full sm:h-[min(42vh,380px)]">
        <Image
          src={restaurant.image}
          alt={restaurant.name}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
        <div className="absolute left-3 right-3 top-[max(0.75rem,env(safe-area-inset-top))] flex items-center justify-between gap-2 sm:left-5 sm:right-5">
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-white/95 text-brand-dark shadow-lg backdrop-blur-sm"
            aria-label="Back"
          >
            <IoArrowBack className="text-xl" />
          </button>
          <div className="flex items-center gap-2">
            <Link
              href="/cart"
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-white/95 text-brand-dark shadow-lg backdrop-blur-sm"
              aria-label="Cart"
            >
              <AiOutlineShopping className="text-xl text-brand-primary" />
            </Link>
          </div>
        </div>
      </div>

      {/* Overlapping info card — Foodpanda-style summary strip */}
      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6">
        <div className="-mt-14 rounded-2xl border border-black/[0.06] bg-white p-5 shadow-xl shadow-black/10 ring-1 ring-black/[0.04] sm:-mt-16 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-primary">
            {restaurant.category}
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-brand-dark sm:text-3xl">
            {restaurant.name}
          </h1>

          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 border-t border-black/[0.06] pt-4 text-sm">
            <span className="inline-flex items-center gap-1.5 font-semibold text-brand-dark">
              <MdOutlineStar className="text-lg text-brand-primary" aria-hidden />
              {restaurant.rating}
              <span className="font-normal text-brand-muted">(500+)</span>
            </span>
            <span className="inline-flex items-center gap-1.5 text-brand-muted">
              <MdOutlineDeliveryDining className="text-lg text-brand-primary" aria-hidden />
              {restaurant.eta}
            </span>
            <span className="inline-flex items-center gap-1.5 text-brand-muted">
              <FaWalking className="text-base text-brand-primary" aria-hidden />
              Pick-up
            </span>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-brand-secondary/50 px-3 py-1 text-xs font-semibold text-brand-dark">
              Min. order — marketplace
            </span>
            <span className="rounded-full bg-brand-background px-3 py-1 text-xs font-semibold text-brand-muted ring-1 ring-black/[0.06]">
              Delivery fee varies by distance
            </span>
          </div>
        </div>
      </div>

      {/* Menu — full product list */}
      <div className="mx-auto mt-8 max-w-3xl px-4 sm:px-6">
        <RestaurantMenu restaurantName={restaurant.name} />
      </div>

      <div className="mx-auto mt-10 max-w-3xl px-4 text-center sm:px-6">
        <Link
          href="/order/popular"
          className="text-sm font-semibold text-brand-primary hover:underline"
        >
          Browse all categories in shop →
        </Link>
      </div>
    </article>
  );
}
