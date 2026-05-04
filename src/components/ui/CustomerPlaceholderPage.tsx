import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  title: string;
  description: string;
  children?: ReactNode;
};

export default function CustomerPlaceholderPage({
  title,
  description,
  children,
}: Props) {
  return (
    <div className="mx-auto max-w-xl px-4 py-16 text-center sm:py-20">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-secondary/50 text-2xl font-bold text-brand-primary shadow-inner ring-1 ring-brand-secondary/80">
        GG
      </div>
      <h1 className="text-2xl font-bold tracking-tight text-brand-dark sm:text-3xl">
        {title}
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-brand-muted">{description}</p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link
          href="/order/popular"
          className="inline-flex min-h-11 items-center justify-center rounded-xl bg-brand-primary px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-brand-primary/90"
        >
          Order food
        </Link>
        <Link
          href="/ourMenu"
          className="inline-flex min-h-11 items-center justify-center rounded-xl border-2 border-brand-secondary bg-white px-6 py-2.5 text-sm font-semibold text-brand-dark hover:border-brand-primary"
        >
          Browse menu
        </Link>
      </div>
      {children}
    </div>
  );
}
