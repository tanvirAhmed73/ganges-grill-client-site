"use client";

import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import PageAndMenuCover from "@/components/ui/PageAndMenuCover";
import ShopCategoryTabs from "@/components/shop/ShopCategoryTabs";
import ShopSearchBar from "@/components/shop/ShopSearchBar";
import useMenu from "@/hooks/useMenu";
import {
  DEFAULT_SHOP_CATEGORY,
  isShopCategoryId,
} from "@/lib/shop/categories";
import OrderShared from "@/components/order/OrderShared";

function OrderShopContent({
  activeCategory,
  filteredMenu,
  totalInCategory,
}) {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 pt-2 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-4 border-b border-black/[0.06] pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-brand-dark sm:text-3xl">
            Order online
          </h1>
          <p className="mt-1 text-sm text-brand-muted">
            {totalInCategory} {totalInCategory === 1 ? "dish" : "dishes"}
            {filteredMenu.length !== totalInCategory
              ? ` · ${filteredMenu.length} match your search`
              : null}
          </p>
        </div>
        <Suspense
          fallback={
            <div className="h-11 max-w-xl flex-1 animate-pulse rounded-xl bg-brand-secondary/50" />
          }
        >
          <ShopSearchBar basePath={`/order/${activeCategory}`} className="sm:max-w-md" />
        </Suspense>
      </div>

      <ShopCategoryTabs activeId={activeCategory} />

      <div className="mt-8">
        <OrderShared menu={filteredMenu} />
      </div>
    </div>
  );
}

export default function OrderShopView({ categorySlug }) {
  const [menu, loading] = useMenu();
  const searchParams = useSearchParams();
  const q = (searchParams.get("q") || "").trim().toLowerCase();

  const activeCategory = isShopCategoryId(categorySlug)
    ? categorySlug
    : DEFAULT_SHOP_CATEGORY;

  const categoryItems = useMemo(
    () => menu.filter((item) => item.category === activeCategory),
    [menu, activeCategory]
  );

  const filteredMenu = useMemo(() => {
    if (!q) return categoryItems;
    return categoryItems.filter(
      (item) =>
        item.name?.toLowerCase().includes(q) ||
        (item.recipe && String(item.recipe).toLowerCase().includes(q))
    );
  }, [categoryItems, q]);

  if (loading) {
    return (
      <div>
        <PageAndMenuCover
          img="https://i.ibb.co/GsFcRwK/banner2.jpg"
          title="Our menu"
          description="Loading dishes…"
        />
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-80 animate-pulse rounded-2xl bg-brand-secondary/40"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageAndMenuCover
        img="https://i.ibb.co/GsFcRwK/banner2.jpg"
        title="Order your favourites"
        description="Browse by category, search, and add to cart — fast delivery across Dhaka."
      />
      <OrderShopContent
        activeCategory={activeCategory}
        filteredMenu={filteredMenu}
        totalInCategory={categoryItems.length}
      />
    </div>
  );
}
