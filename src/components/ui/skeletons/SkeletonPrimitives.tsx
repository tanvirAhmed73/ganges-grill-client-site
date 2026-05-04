import type { ReactNode } from "react";

/** Base pulse block; use for layout-only placeholders (no text content). */
export function SkBlock({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-brand-secondary/40 ${className}`}
      aria-hidden
    />
  );
}

export function SkLine({ className = "" }: { className?: string }) {
  return <SkBlock className={`h-3 ${className}`} />;
}

type SkGridProps = { count?: number; children?: ReactNode };

/** Responsive card grid used across menu / order views */
export function SkCardGrid({ count = 6 }: SkGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-sm ring-1 ring-black/[0.03]"
        >
          <SkBlock className="aspect-[4/3] w-full rounded-none rounded-t-2xl bg-brand-secondary/35" />
          <div className="space-y-3 p-4">
            <SkLine className="h-4 w-[88%] max-w-[14rem]" />
            <SkLine className="h-3 w-1/3 max-w-[5rem] bg-brand-secondary/30" />
            <div className="flex gap-2 pt-1">
              <SkBlock className="h-10 flex-1 rounded-xl bg-brand-secondary/30" />
              <SkBlock className="h-10 w-24 rounded-xl bg-brand-secondary/25" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
