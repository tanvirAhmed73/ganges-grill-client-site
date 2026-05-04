import { Suspense } from "react";
import SiteCartView from "@/components/cart/SiteCartView";

export const metadata = {
  title: "Cart",
};

function CartFallback() {
  return (
    <div className="mx-auto max-w-4xl animate-pulse px-4 py-12">
      <div className="h-8 w-40 rounded bg-brand-secondary/40" />
      <div className="mt-8 h-48 rounded-2xl bg-brand-secondary/30" />
    </div>
  );
}

export default function CartPage() {
  return (
    <Suspense fallback={<CartFallback />}>
      <SiteCartView />
    </Suspense>
  );
}
