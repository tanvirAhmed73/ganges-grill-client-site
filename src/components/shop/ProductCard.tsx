"use client";

import Link from "next/link";
import WishlistToggle from "@/components/wishlist/WishlistToggle";
import { useAddToCart } from "@/hooks/useAddToCart";

export type MenuItemShape = {
  _id: string;
  name: string;
  image: string;
  price: number;
  recipe?: string;
  category?: string;
};

type ProductCardProps = {
  item: MenuItemShape;
  /** Smaller card for marketing sections */
  compact?: boolean;
};

export default function ProductCard({ item, compact = false }: ProductCardProps) {
  const { addToCart } = useAddToCart();
  const { _id, name, image, price, recipe } = item;

  const fmtPrice = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
  }).format(price);

  const handleAddToCart = () => {
    void addToCart(item);
  };

  if (compact) {
    return (
      <div className="relative flex gap-4 rounded-2xl border border-black/[0.06] bg-white p-3 shadow-sm ring-1 ring-black/[0.02] transition hover:shadow-md">
        <Link
          href={`/menu/item/${encodeURIComponent(_id)}`}
          className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-brand-secondary/30"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="h-full w-full object-cover" src={image} alt="" />
        </Link>
        <WishlistToggle item={item} className="absolute right-2 top-2 !min-h-9 !min-w-9" size="sm" />
        <div className="flex min-w-0 flex-1 flex-col justify-center pr-10">
          <Link
            href={`/menu/item/${encodeURIComponent(_id)}`}
            className="font-semibold leading-snug text-brand-dark hover:text-brand-primary"
          >
            {name}
          </Link>
          <p className="mt-1 text-sm font-semibold text-brand-primary">{fmtPrice}</p>
          <button
            type="button"
            onClick={handleAddToCart}
            className="mt-2 w-fit rounded-lg bg-brand-primary px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-primary/90"
          >
            Add
          </button>
        </div>
      </div>
    );
  }

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-sm ring-1 ring-black/[0.03] transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="relative">
        <Link
          href={`/menu/item/${encodeURIComponent(_id)}`}
          className="relative block aspect-[4/3] overflow-hidden bg-brand-secondary/40"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
            src={image}
            alt=""
          />
        </Link>
        <div className="absolute right-3 top-3 z-10">
          <WishlistToggle item={item} />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <Link
          href={`/menu/item/${encodeURIComponent(_id)}`}
          className="line-clamp-2 text-lg font-bold leading-snug text-brand-dark hover:text-brand-primary"
        >
          {name}
        </Link>
        <p className="mt-2 text-lg font-semibold text-brand-primary">{fmtPrice}</p>
        {recipe ? (
          <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-brand-muted">
            {recipe}
          </p>
        ) : null}
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={handleAddToCart}
            className="min-h-11 flex-1 rounded-xl bg-brand-primary px-4 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-brand-primary/90"
          >
            Add to cart
          </button>
          <Link
            href={`/menu/item/${encodeURIComponent(_id)}`}
            className="min-h-11 flex flex-1 items-center justify-center rounded-xl border-2 border-brand-secondary/80 bg-brand-background px-4 py-2.5 text-center text-sm font-semibold text-brand-dark transition hover:border-brand-primary hover:text-brand-primary"
          >
            Details
          </Link>
        </div>
      </div>
    </article>
  );
}
