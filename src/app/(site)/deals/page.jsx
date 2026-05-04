import Link from "next/link";
import Image from "next/image";
import { FiTag, FiZap } from "react-icons/fi";
import { dailyDeals } from "@/components/home/data/homeData";
import MarketingShell from "@/components/marketing/MarketingShell";

export const metadata = {
  title: "Popular deals",
};

export default function DealsPage() {
  return (
    <MarketingShell
      wide
      sheet={false}
      eyebrow="Save more"
      title="Popular deals"
      intro="Campaigns and category offers from our partners. Final price and eligibility are confirmed at checkout."
    >
      <section className="rounded-3xl border border-black/[0.06] bg-white p-6 shadow-sm ring-1 ring-black/[0.03] sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-primary/12 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-primary">
            <FiTag className="text-sm" aria-hidden />
            Featured
          </span>
          <span className="text-sm text-brand-muted">
            Tap a card to explore — landing on home with daily deal picks.
          </span>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {dailyDeals.map((deal) => (
            <Link
              key={deal.title}
              href="/"
              className="group overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-md ring-1 ring-black/[0.04] transition hover:-translate-y-1 hover:shadow-xl hover:ring-brand-primary/20"
            >
              <div className={`relative h-44 overflow-hidden bg-gradient-to-br ${deal.bgClass}`}>
                <Image
                  src={deal.image}
                  alt=""
                  fill
                  className="object-cover opacity-95 transition duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/85">
                    Campaign
                  </p>
                  <p className="mt-1 text-xl font-bold leading-tight">{deal.title}</p>
                  <p className="mt-1 text-sm text-white/90">{deal.subtitle}</p>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-black/[0.05] bg-brand-background/40 px-4 py-3">
                <span className="text-xs font-semibold text-brand-dark">View on home</span>
                <span className="text-brand-primary transition group-hover:translate-x-0.5">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden rounded-3xl border border-brand-primary/25 bg-gradient-to-br from-brand-primary to-orange-600 px-6 py-10 text-center text-white shadow-lg shadow-brand-primary/25 sm:px-10">
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-2xl"
          aria-hidden
        />
        <FiZap className="mx-auto h-10 w-10 text-white/95" aria-hidden />
        <h2 className="mt-4 text-xl font-bold sm:text-2xl">Shop category offers</h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-white/90">
          Weekly combos and discounted dishes live under our Offers category — same checkout as the
          rest of the app.
        </p>
        <Link
          href="/order/offered"
          className="mt-8 inline-flex min-h-12 items-center justify-center rounded-xl bg-white px-10 py-3 text-sm font-bold text-brand-primary shadow-md transition hover:bg-brand-background"
        >
          Browse offers
        </Link>
      </section>
    </MarketingShell>
  );
}
