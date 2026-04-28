import { Suspense } from "react";
import HomePageClient from "../HomePageClient";

function HomeFallback() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center bg-brand-background">
      <div className="h-9 w-9 animate-spin rounded-full border-2 border-brand-secondary border-t-brand-primary" />
    </div>
  );
}

/** Alias route — same behavior as `/` (Delivery default, `?service=pickup` for Pick-up). */
export default function HomeAliasPage() {
  return (
    <Suspense fallback={<HomeFallback />}>
      <HomePageClient />
    </Suspense>
  );
}
