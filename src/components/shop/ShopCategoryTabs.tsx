"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  SHOP_CATEGORIES,
  type ShopCategoryId,
} from "@/lib/shop/categories";

type ShopCategoryTabsProps = {
  activeId: ShopCategoryId;
};

export default function ShopCategoryTabs({ activeId }: ShopCategoryTabsProps) {
  const searchParams = useSearchParams();
  const q = searchParams.get("q");
  const suffix = q?.trim() ? `?q=${encodeURIComponent(q.trim())}` : "";

  return (
    <div className="w-full overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <nav
        className="flex min-w-min gap-2 sm:flex-wrap sm:justify-center"
        aria-label="Menu categories"
      >
        {SHOP_CATEGORIES.map(({ id, label }) => {
          const active = id === activeId;
          return (
            <Link
              key={id}
              href={`/order/${id}${suffix}`}
              scroll={false}
              className={`shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                active
                  ? "bg-brand-primary text-white shadow-md shadow-brand-primary/25"
                  : "border border-black/[0.08] bg-white text-brand-dark hover:border-brand-primary/40 hover:bg-brand-secondary/30"
              }`}
              aria-current={active ? "page" : undefined}
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
