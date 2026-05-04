import { SkBlock, SkLine } from "@/components/ui/skeletons/SkeletonPrimitives";

/** Placeholder for dashboard `page` while route loads; shell layout stays mounted. */
export default function DashboardContentSkeleton() {
  return (
    <div className="space-y-8">
      <div>
        <SkLine className="h-8 w-48 max-w-full bg-neutral-300/90" />
        <SkLine className="mt-2 h-4 w-72 max-w-full bg-neutral-200/90" />
      </div>
      <SkBlock className="h-48 w-full max-w-3xl rounded-2xl bg-neutral-200/80" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <SkBlock key={i} className="h-32 rounded-xl bg-neutral-200/70" />
        ))}
      </div>
      <div className="space-y-3">
        <SkLine className="h-4 w-full bg-neutral-200/80" />
        <SkLine className="h-4 w-[92%] bg-neutral-200/70" />
        <SkLine className="h-4 w-[78%] bg-neutral-200/60" />
      </div>
    </div>
  );
}
