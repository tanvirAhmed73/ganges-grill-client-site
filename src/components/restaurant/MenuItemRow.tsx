"use client";

import Link from "next/link";
import WishlistToggle from "@/components/wishlist/WishlistToggle";
import { useAddToCart } from "@/hooks/useAddToCart";
import type { MenuItemShape } from "@/components/shop/ProductCard";

type MenuItemRowProps = {
  item: MenuItemShape;
};

export default function MenuItemRow({ item }: MenuItemRowProps) {
  const { addToCart } = useAddToCart();
  const { _id, name, image, price, recipe } = item;

  const fmt = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
  }).format(price);

  return (
    <div className="relative flex gap-3 rounded-2xl border border-black/[0.06] bg-white p-3 shadow-sm ring-1 ring-black/[0.02] sm:gap-4 sm:p-4">
      <Link
        href={`/menu/item/${encodeURIComponent(_id)}`}
        className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-brand-secondary/30 sm:h-28 sm:w-28"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt="" className="h-full w-full object-cover" />
      </Link>

      <WishlistToggle item={item} className="absolute right-2 top-2 sm:right-3 sm:top-3" size="sm" />

      <div className="flex min-w-0 flex-1 flex-col justify-between gap-2 pr-12 sm:flex-row sm:items-center">
        <div className="min-w-0">
          <Link
            href={`/menu/item/${encodeURIComponent(_id)}`}
            className="font-semibold leading-snug text-brand-dark hover:text-brand-primary"
          >
            {name}
          </Link>
          {recipe ? (
            <p className="mt-1 line-clamp-2 text-sm text-brand-muted">{recipe}</p>
          ) : null}
          <p className="mt-2 text-base font-bold text-brand-primary">{fmt}</p>
        </div>
        <button
          type="button"
          onClick={() => void addToCart(item)}
          className="shrink-0 self-start rounded-xl border-2 border-brand-primary bg-brand-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-primary/90 sm:self-center"
        >
          Add
        </button>
      </div>
    </div>
  );
}
