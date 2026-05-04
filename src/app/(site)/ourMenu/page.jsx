import { Suspense } from "react";
import SitePageSkeleton from "@/components/ui/skeletons/SitePageSkeleton";
import OurMenuView from "@/components/our-menu/OurMenuView";

export const metadata = {
  title: "Our Menu",
};

function OurMenuFallback() {
  return <SitePageSkeleton />;
}

export default function OurMenuPage() {
  return (
    <Suspense fallback={<OurMenuFallback />}>
      <OurMenuView />
    </Suspense>
  );
}
