"use client";

import ProductCard from "@/components/shop/ProductCard";

export default function OrderShared({ menu }) {
  if (!menu || menu.length === 0) {
    return (
      <div className="mx-auto max-w-md rounded-2xl border border-dashed border-black/[0.1] bg-white/80 px-6 py-16 text-center">
        <p className="text-sm font-medium text-brand-dark">No dishes in this view</p>
        <p className="mt-2 text-sm text-brand-muted">
          Try another category or clear your search filter.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
      {menu.map((item) => (
        <ProductCard key={item._id} item={item} />
      ))}
    </div>
  );
}
