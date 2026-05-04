import { SkBlock, SkLine } from "@/components/ui/skeletons/SkeletonPrimitives";

/** Placeholder for vendor portal pages while route loads. */
export default function VendorContentSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-2">
          <SkLine className="h-6 w-40 bg-slate-200/90" />
          <SkLine className="h-4 w-56 bg-slate-200/70" />
        </div>
        <SkBlock className="h-10 w-32 rounded-xl bg-slate-200/80" />
      </div>
      <div className="h-px w-full bg-slate-200/80" aria-hidden />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <SkBlock key={i} className="h-28 rounded-2xl bg-slate-200/70" />
        ))}
      </div>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="space-y-0 divide-y divide-slate-100">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-4 px-4 py-4">
              <SkBlock className="h-12 w-12 shrink-0 rounded-lg bg-slate-200/70" />
              <div className="min-w-0 flex-1 space-y-2">
                <SkLine className="h-4 w-48 bg-slate-200/80" />
                <SkLine className="h-3 w-32 bg-slate-200/60" />
              </div>
              <SkBlock className="h-8 w-20 rounded-lg bg-slate-200/60" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
