"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useMemo } from "react";
import { IoArrowBack } from "react-icons/io5";
import ProductCard, {
  type MenuItemShape,
} from "@/components/shop/ProductCard";
import WishlistToggle from "@/components/wishlist/WishlistToggle";
import { useAddToCart } from "@/hooks/useAddToCart";
import useMenu from "@/hooks/useMenu";

export default function ProductDetailView() {
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : "";
  const [menu, loading] = useMenu();
  const router = useRouter();
  const { addToCart } = useAddToCart();

  const item = useMemo(
    () => menu.find((m: { _id: string }) => m._id === id),
    [menu, id]
  );

  const fmtPrice = (n: number) =>
    new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(
      n
    );

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="h-10 w-40 animate-pulse rounded-lg bg-brand-secondary/50" />
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <div className="aspect-square animate-pulse rounded-2xl bg-brand-secondary/40" />
          <div className="space-y-4">
            <div className="h-8 w-3/4 animate-pulse rounded bg-brand-secondary/40" />
            <div className="h-6 w-1/3 animate-pulse rounded bg-brand-secondary/30" />
            <div className="h-24 animate-pulse rounded-lg bg-brand-secondary/25" />
          </div>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <h1 className="text-xl font-bold text-brand-dark">Dish not found</h1>
        <p className="mt-2 text-sm text-brand-muted">
          This item may have been removed from the menu.
        </p>
        <Link
          href={`/order/popular`}
          className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl bg-brand-primary px-6 py-2.5 text-sm font-semibold text-white"
        >
          Browse menu
        </Link>
      </div>
    );
  }

  const related = (menu as MenuItemShape[])
    .filter(
      (m) => m._id !== item._id && m.category === item.category
    )
    .slice(0, 3);

  const shape: MenuItemShape = {
    _id: item._id,
    name: item.name,
    image: item.image,
    price: item.price,
    recipe: item.recipe,
    category: item.category,
  };

  return (
    <div className="bg-brand-background pb-16 pt-4 sm:pt-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => router.back()}
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-muted hover:text-brand-dark"
        >
          <IoArrowBack className="text-lg" aria-hidden />
          Back
        </button>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="relative overflow-hidden rounded-3xl border border-black/[0.06] bg-white shadow-lg ring-1 ring-black/[0.04]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.image}
              alt=""
              className="aspect-[4/3] w-full object-cover sm:aspect-square"
            />
            <div className="absolute right-4 top-4 z-10">
              <WishlistToggle item={shape} />
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-primary">
              {item.category ?? "Menu"}
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl">
              {item.name}
            </h1>
            <p className="mt-4 text-2xl font-bold text-brand-primary">
              {fmtPrice(item.price)}
            </p>
            {item.recipe ? (
              <p className="mt-6 text-base leading-relaxed text-brand-muted">
                {item.recipe}
              </p>
            ) : null}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => void addToCart(shape)}
                className="min-h-12 flex-1 rounded-xl bg-brand-primary px-6 py-3 text-center text-base font-semibold text-white shadow-md shadow-brand-primary/20 hover:bg-brand-primary/90"
              >
                Add to cart
              </button>
              <Link
                href="/cart"
                className="flex min-h-12 flex-1 items-center justify-center rounded-xl border-2 border-brand-dark/10 bg-white px-6 py-3 text-center text-base font-semibold text-brand-dark hover:border-brand-primary"
              >
                View cart
              </Link>
            </div>
          </div>
        </div>

        {related.length > 0 ? (
          <section className="mt-16 border-t border-black/[0.06] pt-12">
            <h2 className="text-xl font-bold text-brand-dark sm:text-2xl">
              More in this category
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <ProductCard key={r._id} item={r} />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}
