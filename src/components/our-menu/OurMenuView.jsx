"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";
import PageAndMenuCover from "@/components/ui/PageAndMenuCover";
import ProductCard from "@/components/shop/ProductCard";
import useMenu from "@/hooks/useMenu";
import { SHOP_CATEGORIES } from "@/lib/shop/categories";

export default function OurMenuView() {
  const [menu, loading] = useMenu();
  const [q, setQ] = useState("");

  const qLower = q.trim().toLowerCase();
  const filtered = useMemo(() => {
    if (!qLower) return menu;
    return menu.filter(
      (item) =>
        item.name?.toLowerCase().includes(qLower) ||
        (item.recipe && String(item.recipe).toLowerCase().includes(qLower))
    );
  }, [menu, qLower]);

  return (
    <div>
      <PageAndMenuCover
        img="https://i.ibb.co/5vJDpnM/banner3.jpg"
        title="Our menu"
        description="Discover dishes by category or search the full list — then order in a tap."
      />

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex max-w-xl flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-brand-dark sm:text-3xl">
              Find your flavour
            </h1>
            <p className="mt-1 text-sm text-brand-muted">
              Search the menu or jump to a category shop.
            </p>
          </div>
        </div>

        <form
          className="mb-10 flex max-w-xl flex-col gap-2 sm:flex-row"
          onSubmit={(e) => e.preventDefault()}
          role="search"
        >
          <div className="relative min-w-0 flex-1">
            <FiSearch
              className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-muted"
              aria-hidden
            />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search dishes…"
              className="min-h-11 w-full rounded-xl border border-black/[0.08] bg-white py-2.5 pl-10 pr-3 text-sm text-brand-dark shadow-sm outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
            />
          </div>
          <Link
            href={q.trim() ? `/order/popular?q=${encodeURIComponent(q.trim())}` : "/order/popular"}
            className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-xl bg-brand-dark px-5 text-sm font-semibold text-white hover:bg-brand-dark/90"
          >
            Open shop
          </Link>
        </form>

        {qLower && (
          <section className="mb-12">
            <h2 className="text-lg font-bold text-brand-dark">Search results</h2>
            {loading ? (
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="h-32 animate-pulse rounded-2xl bg-brand-secondary/40" />
                <div className="h-32 animate-pulse rounded-2xl bg-brand-secondary/40" />
              </div>
            ) : filtered.length === 0 ? (
              <p className="mt-3 text-sm text-brand-muted">No matches. Try another keyword.</p>
            ) : (
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.slice(0, 12).map((item) => (
                  <ProductCard key={item._id} item={item} compact />
                ))}
              </div>
            )}
          </section>
        )}

        <section className="mb-10">
          <h2 className="text-lg font-bold text-brand-dark sm:text-xl">Shop by category</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
            {SHOP_CATEGORIES.map(({ id, label }) => (
              <Link
                key={id}
                href={`/order/${id}`}
                className="flex min-h-[88px] flex-col items-center justify-center rounded-2xl border border-black/[0.08] bg-white p-4 text-center text-sm font-semibold text-brand-dark shadow-sm transition hover:border-brand-primary/50 hover:bg-brand-secondary/30 hover:text-brand-primary"
              >
                {label}
              </Link>
            ))}
          </div>
        </section>

        {!qLower && (
          <>
            {SHOP_CATEGORIES.map(({ id, label }) => {
              const items = menu.filter((m) => m.category === id).slice(0, 4);
              if (items.length === 0) return null;
              return (
                <section key={id} className="mb-14">
                  <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
                    <h2 className="text-xl font-bold text-brand-dark">{label}</h2>
                    <Link
                      href={`/order/${id}`}
                      className="text-sm font-semibold text-brand-primary hover:underline"
                    >
                      See all
                    </Link>
                  </div>
                  {loading ? (
                    <div className="grid gap-4 sm:grid-cols-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-28 animate-pulse rounded-2xl bg-brand-secondary/35" />
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      {items.map((item) => (
                        <ProductCard key={item._id} item={item} compact />
                      ))}
                    </div>
                  )}
                </section>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
