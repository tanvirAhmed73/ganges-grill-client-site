import { SkBlock, SkCardGrid, SkLine } from "@/components/ui/skeletons/SkeletonPrimitives";

type SitePageSkeletonProps = {
  /** Simpler layout (e.g. cart / account) */
  variant?: "default" | "compact" | "detail";
};

/**
 * Main content placeholder while a `(site)` route segment loads.
 * Layout shell (navbar, footer) stays visible; this fills the main area.
 */
export default function SitePageSkeleton({ variant = "default" }: SitePageSkeletonProps) {
  if (variant === "compact") {
    return (
      <div className="min-h-[45vh] bg-brand-background">
        <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
          <SkBlock className="mx-auto h-8 w-48" />
          <div className="mt-8 space-y-4">
            {[1, 2, 3].map((i) => (
              <SkBlock key={i} className="h-24 w-full rounded-2xl bg-brand-secondary/35" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (variant === "detail") {
    return (
      <div className="min-h-[50vh] bg-brand-background pb-16 pt-4">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SkLine className="h-4 w-24 bg-brand-secondary/35" />
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <SkBlock className="aspect-square w-full rounded-3xl bg-brand-secondary/35" />
            <div className="space-y-4 pt-2">
              <SkLine className="h-4 w-28 bg-brand-primary/25" />
              <SkBlock className="h-10 w-full max-w-md" />
              <SkLine className="h-8 w-32 bg-brand-primary/20" />
              <SkLine className="h-20 w-full max-w-lg bg-brand-secondary/25" />
              <div className="flex gap-3 pt-4">
                <SkBlock className="h-12 flex-1 rounded-xl bg-brand-primary/40" />
                <SkBlock className="h-12 flex-1 rounded-xl bg-brand-secondary/35" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[55vh] bg-brand-background">
      {/* Hero / cover strip */}
      <div className="border-b border-black/[0.06] bg-brand-secondary/15">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
          <SkBlock className="h-44 w-full rounded-2xl bg-brand-secondary/40 sm:h-52" />
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-2">
              <SkBlock className="h-9 w-56 max-w-full bg-brand-secondary/45" />
              <SkLine className="h-4 w-full max-w-xl bg-brand-secondary/30" />
            </div>
            <SkBlock className="h-11 w-full max-w-xs rounded-xl bg-brand-secondary/35 sm:w-72" />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <SkBlock key={i} className="h-10 w-24 rounded-full bg-brand-secondary/35" />
          ))}
        </div>
        <SkCardGrid count={6} />
      </div>
    </div>
  );
}
