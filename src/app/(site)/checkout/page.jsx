import { Suspense } from "react";
import CheckoutView from "@/components/checkout/CheckoutView";

export const metadata = {
  title: "Checkout",
};

function CheckoutFallback() {
  return (
    <div className="mx-auto max-w-5xl animate-pulse px-4 py-12">
      <div className="h-8 w-48 rounded bg-brand-secondary/40" />
      <div className="mt-10 grid gap-8 lg:grid-cols-5">
        <div className="h-96 rounded-2xl bg-brand-secondary/30 lg:col-span-3" />
        <div className="h-64 rounded-2xl bg-brand-secondary/25 lg:col-span-2" />
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<CheckoutFallback />}>
      <CheckoutView />
    </Suspense>
  );
}
