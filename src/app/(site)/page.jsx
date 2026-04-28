import { Suspense } from "react";
import HomePageClient from "./HomePageClient";

function HomeFallback() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center bg-brand-background">
      <div className="h-9 w-9 animate-spin rounded-full border-2 border-brand-secondary border-t-brand-primary" />
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<HomeFallback />}>
      <HomePageClient />
    </Suspense>
  );
}
