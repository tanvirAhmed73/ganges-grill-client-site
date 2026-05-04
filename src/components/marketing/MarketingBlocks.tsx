import Link from "next/link";
import type { ReactNode } from "react";

type InfoCardProps = {
  icon: ReactNode;
  title: string;
  children: ReactNode;
};

/** Contact / help: icon tile with title and content */
export function MarketingInfoCard({ icon, title, children }: InfoCardProps) {
  return (
    <div className="group rounded-2xl border border-black/[0.07] bg-gradient-to-b from-white to-brand-background/30 p-6 shadow-sm ring-1 ring-black/[0.04] transition hover:border-brand-primary/25 hover:shadow-md">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-primary/12 text-xl text-brand-primary transition group-hover:bg-brand-primary/18">
        {icon}
      </div>
      <h3 className="mt-4 text-base font-bold text-brand-dark">{title}</h3>
      <div className="mt-2 text-sm leading-relaxed text-brand-muted">{children}</div>
    </div>
  );
}

type HelpTopicProps = {
  title: string;
  description: string;
  href: string;
  actionLabel: string;
};

export function MarketingHelpTopic({ title, description, href, actionLabel }: HelpTopicProps) {
  return (
    <Link
      href={href}
      className="flex flex-col rounded-2xl border border-black/[0.07] bg-white p-5 shadow-sm ring-1 ring-black/[0.03] transition hover:-translate-y-0.5 hover:border-brand-primary/30 hover:shadow-lg sm:flex-row sm:items-center sm:justify-between sm:gap-6"
    >
      <div>
        <h3 className="font-bold text-brand-dark">{title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-brand-muted">{description}</p>
      </div>
      <span className="mt-4 inline-flex shrink-0 items-center text-sm font-semibold text-brand-primary sm:mt-0">
        {actionLabel}
        <span className="ml-1" aria-hidden>
          →
        </span>
      </span>
    </Link>
  );
}

type FeatureProps = { title: string; description: string };

/** Three-up value props (About, Partner, etc.) */
export function MarketingFeatureGrid({ items }: { items: FeatureProps[] }) {
  return (
    <div className="not-prose mt-8 grid gap-4 sm:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.title}
          className="rounded-2xl border border-brand-secondary/50 bg-gradient-to-br from-brand-secondary/25 to-brand-background/50 px-5 py-6 text-center"
        >
          <p className="font-bold text-brand-dark">{item.title}</p>
          <p className="mt-2 text-sm leading-relaxed text-brand-muted">{item.description}</p>
        </div>
      ))}
    </div>
  );
}
