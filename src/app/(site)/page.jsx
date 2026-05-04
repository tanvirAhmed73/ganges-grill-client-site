import { Suspense } from "react";
import SitePageSkeleton from "@/components/ui/skeletons/SitePageSkeleton";
import HomePageClient from "./HomePageClient";

function HomeFallback() {
  return <SitePageSkeleton />;
}

export default function HomePage() {
  return (
    <Suspense fallback={<HomeFallback />}>
      <HomePageClient />
    </Suspense>
  );
}
