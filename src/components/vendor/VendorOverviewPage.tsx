"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  apiGetMyOrders,
  apiGetMyProducts,
  apiGetMyRestaurant,
} from "@/lib/api/restaurant-owner-api";
import { getApiErrorMessage } from "@/lib/api/api-error";
import {
  MdOutlineRestaurantMenu,
  MdOutlineShoppingBag,
  MdOutlineStorefront,
} from "react-icons/md";

type Restaurant = {
  id: string;
  name: string;
  status: string;
  rating: number;
  slug: string;
};

export default function VendorOverviewPage() {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [productCount, setProductCount] = useState<number | null>(null);
  const [pendingOrders, setPendingOrders] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const [rRes, pRes, oRes] = await Promise.all([
          apiGetMyRestaurant(),
          apiGetMyProducts(),
          apiGetMyOrders({ status: "pending_acceptance" }),
        ]);
        if (cancelled) return;
        setRestaurant(rRes.data?.restaurant ?? null);
        const products = pRes.data?.products;
        setProductCount(Array.isArray(products) ? products.length : 0);
        const orders = oRes.data?.orders;
        setPendingOrders(Array.isArray(orders) ? orders.length : 0);
      } catch (e) {
        if (!cancelled) setError(getApiErrorMessage(e));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const statusStyle = (s: string) => {
    switch (s) {
      case "active":
        return "bg-emerald-100 text-emerald-800 ring-emerald-200";
      case "pending_review":
        return "bg-amber-100 text-amber-900 ring-amber-200";
      case "suspended":
        return "bg-red-100 text-red-800 ring-red-200";
      default:
        return "bg-slate-100 text-slate-800 ring-slate-200";
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-vendor-ink sm:text-3xl">
          Overview
        </h1>
        <p className="mt-1 max-w-2xl text-sm text-vendor-muted">
          Manage your listing, menu, and incoming orders from one place.
        </p>
      </div>

      {error ? (
        <div
          className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
          role="alert"
        >
          {error}
        </div>
      ) : null}

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-28 animate-pulse rounded-2xl bg-teal-100/40"
            />
          ))}
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/vendor/restaurant"
              className="group flex flex-col rounded-2xl border border-vendor-border bg-white p-5 shadow-sm transition hover:border-teal-300 hover:shadow-md"
            >
              <span className="flex items-center gap-2 text-sm font-semibold text-vendor-primary">
                <MdOutlineStorefront className="text-xl" aria-hidden />
                Restaurant
              </span>
              <span className="mt-2 truncate text-lg font-bold text-vendor-ink">
                {restaurant?.name ?? "—"}
              </span>
              {restaurant?.status ? (
                <span
                  className={`mt-3 inline-flex w-fit rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${statusStyle(
                    restaurant.status
                  )}`}
                >
                  {restaurant.status.replace(/_/g, " ")}
                </span>
              ) : null}
              <span className="mt-auto pt-4 text-sm font-medium text-teal-600 group-hover:underline">
                Edit profile →
              </span>
            </Link>

            <Link
              href="/vendor/menu"
              className="group flex flex-col rounded-2xl border border-vendor-border bg-white p-5 shadow-sm transition hover:border-teal-300 hover:shadow-md"
            >
              <span className="flex items-center gap-2 text-sm font-semibold text-vendor-primary">
                <MdOutlineRestaurantMenu className="text-xl" aria-hidden />
                Menu items
              </span>
              <span className="mt-3 text-4xl font-bold tabular-nums text-vendor-ink">
                {productCount ?? "—"}
              </span>
              <span className="mt-1 text-sm text-vendor-muted">products live</span>
              <span className="mt-auto pt-4 text-sm font-medium text-teal-600 group-hover:underline">
                Manage menu →
              </span>
            </Link>

            <Link
              href="/vendor/orders"
              className="group flex flex-col rounded-2xl border border-vendor-border bg-white p-5 shadow-sm transition hover:border-teal-300 hover:shadow-md sm:col-span-2 lg:col-span-1"
            >
              <span className="flex items-center gap-2 text-sm font-semibold text-vendor-primary">
                <MdOutlineShoppingBag className="text-xl" aria-hidden />
                New orders
              </span>
              <span className="mt-3 text-4xl font-bold tabular-nums text-vendor-ink">
                {pendingOrders ?? "—"}
              </span>
              <span className="mt-1 text-sm text-vendor-muted">
                awaiting acceptance
              </span>
              <span className="mt-auto pt-4 text-sm font-medium text-teal-600 group-hover:underline">
                Open orders →
              </span>
            </Link>
          </div>

          {restaurant?.slug ? (
            <p className="text-xs text-vendor-muted">
              Public slug:{" "}
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-vendor-ink">
                {restaurant.slug}
              </code>
            </p>
          ) : null}
        </>
      )}
    </div>
  );
}
