import { Suspense } from "react";
import { redirect } from "next/navigation";
import OrderShopView from "@/components/order/OrderShopView";
import {
  DEFAULT_SHOP_CATEGORY,
  isShopCategoryId,
} from "@/lib/shop/categories";

export const metadata = {
  title: "Order online",
};

function OrderFallback() {
  return (
    <div className="min-h-[50vh] bg-brand-background">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-8 h-48 animate-pulse rounded-2xl bg-brand-secondary/40" />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-80 animate-pulse rounded-2xl bg-brand-secondary/30"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function OrderPage({ params }) {
  const slug = params.slug;
  const parts = Array.isArray(slug) ? slug : slug ? [slug] : [];
  if (parts.length === 0) {
    redirect(`/order/${DEFAULT_SHOP_CATEGORY}`);
  }
  const categorySlug = parts[0];
  if (!isShopCategoryId(categorySlug)) {
    redirect(`/order/${DEFAULT_SHOP_CATEGORY}`);
  }

  return (
    <Suspense fallback={<OrderFallback />}>
      <OrderShopView categorySlug={categorySlug} />
    </Suspense>
  );
}
