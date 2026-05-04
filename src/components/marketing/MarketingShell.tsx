import type { ReactNode } from "react";

export type MarketingShellProps = {
  eyebrow?: string;
  title: string;
  intro?: string;
  children: ReactNode;
  wide?: boolean;
  sheet?: boolean;
};

const proseSheet =
  "marketing-content space-y-6 text-[15px] leading-relaxed text-brand-muted [&_h2]:mt-10 [&_h2]:scroll-mt-28 [&_h2]:border-b [&_h2]:border-black/[0.06] [&_h2]:pb-3 [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-brand-dark [&_h2]:first:mt-0 [&_li]:marker:text-brand-primary [&_ol]:mt-3 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5 [&_p]:text-brand-muted [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_a]:font-semibold [&_a]:text-brand-primary [&_a]:underline-offset-2 hover:[&_a]:underline";

export default function MarketingShell({
  eyebrow,
  title,
  intro,
  children,
  wide = false,
  sheet,
}: MarketingShellProps) {
  const useSheet = sheet ?? !wide;

  const body = useSheet ? (
    <div className="rounded-3xl border border-black/[0.07] bg-white p-7 shadow-[0_24px_80px_-24px_rgba(26,26,26,0.18)] ring-1 ring-black/[0.04] sm:p-9 md:p-11">
      <div className={proseSheet}>{children}</div>
    </div>
  ) : (
    <div className="space-y-10">{children}</div>
  );

  return (
    <div className="min-h-[50vh] bg-brand-background pb-16 pt-0">
      {/* z-0 keeps decorative layers behind; content below uses z-10 so body text is never covered */}
      <header className="relative z-0 overflow-hidden bg-gradient-to-br from-brand-primary via-[#e85d28] to-amber-600 px-4 pb-12 pt-10 sm:px-6 sm:pb-14 sm:pt-12">
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/15 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-24 left-0 h-64 w-64 rounded-full bg-black/10 blur-3xl"
          aria-hidden
        />

        <div className={`relative z-[1] mx-auto ${wide ? "max-w-6xl" : "max-w-3xl lg:max-w-4xl"}`}>
          {eyebrow ? (
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/85">{eyebrow}</p>
          ) : null}
          <h1 className="mt-3 text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            {title}
          </h1>
          {intro ? (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/90 md:text-lg">
              {intro}
            </p>
          ) : null}
        </div>
      </header>

      <div
        className={`relative z-10 mx-auto px-4 sm:px-6 ${wide ? "max-w-6xl" : "max-w-3xl lg:max-w-4xl"} ${
          useSheet ? "-mt-8 sm:-mt-10" : "mt-6"
        }`}
      >
        {body}
      </div>
    </div>
  );
}
