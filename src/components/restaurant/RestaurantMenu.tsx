"use client";

import { useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";
import MenuItemRow from "@/components/restaurant/MenuItemRow";
import useMenu from "@/hooks/useMenu";
import { groupMenuByCategory } from "@/lib/shop/group-menu";
import type { MenuItemShape } from "@/components/shop/ProductCard";

function slugifyCategoryLabel(id: string) {
  return `menu-${id.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`;
}

export default function RestaurantMenu({ restaurantName }: { restaurantName: string }) {
  const [menu, loading, error] = useMenu();
  const [q, setQ] = useState("");
  const [activeCat, setActiveCat] = useState<string | null>(null);

  const filteredFlat = useMemo(() => {
    const list = (menu || []) as MenuItemShape[];
    const t = q.trim().toLowerCase();
    if (!t) return list;
    return list.filter(
      (item) =>
        item.name?.toLowerCase().includes(t) ||
        (item.recipe && String(item.recipe).toLowerCase().includes(t))
    );
  }, [menu, q]);

  const sections = useMemo(
    () => groupMenuByCategory(filteredFlat),
    [filteredFlat]
  );

  const scrollTo = (id: string) => {
    const el = document.getElementById(slugifyCategoryLabel(id));
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveCat(id);
  };

  if (loading) {
    return (
      <div className="space-y-4 pt-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-24 animate-pulse rounded-2xl bg-brand-secondary/35" />
        ))}
      </div>
    );
  }

  if (error && (!menu || menu.length === 0)) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-6 text-center text-sm text-red-800">
        Could not load menu. Check your connection and try again.
      </div>
    );
  }

  if (sections.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-black/15 bg-white px-6 py-12 text-center">
        <p className="font-medium text-brand-dark">No dishes match your search.</p>
        <button
          type="button"
          onClick={() => setQ("")}
          className="mt-4 text-sm font-semibold text-brand-primary hover:underline"
        >
          Clear search
        </button>
      </div>
    );
  }

  return (
    <div className="pt-2">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-brand-dark sm:text-2xl">Full menu</h2>
          <p className="mt-1 text-sm text-brand-muted">
            Add dishes to your cart — same checkout as the rest of the app. Menu data comes from
            the marketplace catalog until per-restaurant APIs are linked.
          </p>
        </div>
      </div>

      <div className="relative mb-4">
        <FiSearch
          className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-muted"
          aria-hidden
        />
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={`Search in ${restaurantName}…`}
          className="min-h-11 w-full rounded-xl border border-black/[0.08] bg-white py-2.5 pl-10 pr-3 text-sm text-brand-dark shadow-sm outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
          aria-label="Search menu"
        />
      </div>

      {/* Sticky category strip — Foodpanda-style horizontal pills */}
      <div className="sticky top-14 z-30 -mx-4 border-b border-black/[0.06] bg-brand-background/95 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6 md:top-16">
        <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {sections.map(({ id, label, items }) => (
            <button
              key={id}
              type="button"
              onClick={() => scrollTo(id)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeCat === id
                  ? "bg-brand-dark text-white"
                  : "border border-black/[0.1] bg-white text-brand-dark hover:border-brand-primary/50"
              }`}
            >
              {label}
              <span className="ml-1 text-xs opacity-80">({items.length})</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 space-y-10 pb-8">
        {sections.map(({ id, label, items }) => (
          <section
            key={id}
            id={slugifyCategoryLabel(id)}
            className="scroll-mt-36 md:scroll-mt-40"
          >
            <h3 className="mb-4 text-lg font-bold text-brand-dark">{label}</h3>
            <ul className="space-y-3">
              {items.map((item) => (
                <li key={item._id}>
                  <MenuItemRow item={item} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
