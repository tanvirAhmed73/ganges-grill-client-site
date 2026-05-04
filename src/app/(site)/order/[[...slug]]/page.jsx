import { Suspense } from "react";
import { redirect } from "next/navigation";
import OrderShopView from "@/components/order/OrderShopView";
import SitePageSkeleton from "@/components/ui/skeletons/SitePageSkeleton";
import {
  DEFAULT_SHOP_CATEGORY,
  isShopCategoryId,
} from "@/lib/shop/categories";

export const metadata = {
  title: "Order online",
};

function OrderFallback() {
  return <SitePageSkeleton />;
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
