"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { MdDeleteOutline } from "react-icons/md";
import { useAddToCart } from "@/hooks/useAddToCart";
import { useWishlist } from "@/contexts/wishlist-context";
import type { MenuItemShape } from "@/components/shop/ProductCard";

export default function WishlistPageView() {
  const { items, remove } = useWishlist();
  const { addToCart } = useAddToCart();
  const router = useRouter();

  const fmt = (n: number) =>
    new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(
      n
    );

  const addCart = (item: (typeof items)[0]) => {
    const shape: MenuItemShape = {
      _id: item.id,
      name: item.name,
      image: item.image,
      price: item.price,
      category: item.category,
    };
    void addToCart(shape);
  };

  const confirmRemove = (id: string, name: string) => {
    Swal.fire({
      title: "Remove?",
      text: name,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF6B35",
      cancelButtonColor: "#94a3b8",
    }).then((r) => {
      if (r.isConfirmed) remove(id);
    });
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center sm:py-20">
        <p className="text-4xl" aria-hidden>
          ♡
        </p>
        <h1 className="mt-4 text-2xl font-bold text-brand-dark">Your wishlist is empty</h1>
        <p className="mt-2 text-sm text-brand-muted">
          Tap the heart on any dish to save it here for later.
        </p>
        <Link
          href="/order/popular"
          className="mt-8 inline-flex min-h-12 items-center justify-center rounded-xl bg-brand-primary px-8 py-3 text-sm font-semibold text-white shadow-md hover:bg-brand-primary/90"
        >
          Browse menu
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 pb-24 pt-8 sm:px-6">
      <div className="mb-8">
        <button
          type="button"
          onClick={() => router.back()}
          className="text-sm font-semibold text-brand-primary hover:underline"
        >
          ← Back
        </button>
        <h1 className="mt-4 text-2xl font-bold tracking-tight text-brand-dark sm:text-3xl">
          Wishlist
        </h1>
        <p className="mt-1 text-sm text-brand-muted">{items.length} saved dishes</p>
      </div>

      <ul className="space-y-4">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex gap-4 rounded-2xl border border-black/[0.06] bg-white p-4 shadow-sm ring-1 ring-black/[0.03]"
          >
            <Link
              href={`/menu/item/${encodeURIComponent(item.id)}`}
              className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-brand-secondary/30"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.image} alt="" className="h-full w-full object-cover" />
            </Link>
            <div className="flex min-w-0 flex-1 flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <div className="min-w-0">
                <Link
                  href={`/menu/item/${encodeURIComponent(item.id)}`}
                  className="font-semibold text-brand-dark hover:text-brand-primary"
                >
                  {item.name}
                </Link>
                <p className="mt-1 text-base font-bold text-brand-primary">{fmt(item.price)}</p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => addCart(item)}
                  className="rounded-xl bg-brand-primary px-4 py-2 text-sm font-semibold text-white hover:bg-brand-primary/90"
                >
                  Add to cart
                </button>
                <button
                  type="button"
                  onClick={() => confirmRemove(item.id, item.name)}
                  className="inline-flex items-center gap-1 rounded-xl border border-red-200 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-50"
                  aria-label="Remove from wishlist"
                >
                  <MdDeleteOutline className="text-lg" aria-hidden />
                  Remove
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
