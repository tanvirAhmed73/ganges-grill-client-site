"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import { FiSearch } from "react-icons/fi";

type ShopSearchBarProps = {
  /** Base path for shop, e.g. `/order/salad` */
  basePath: string;
  className?: string;
};

export default function ShopSearchBar({ basePath, className = "" }: ShopSearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initial = searchParams.get("q") ?? "";
  const [value, setValue] = useState(initial);

  useEffect(() => {
    setValue(searchParams.get("q") ?? "");
  }, [searchParams]);

  const apply = useCallback(
    (q: string) => {
      const params = new URLSearchParams();
      const trimmed = q.trim();
      if (trimmed) params.set("q", trimmed);
      const qs = params.toString();
      router.push(qs ? `${basePath}?${qs}` : basePath, { scroll: false });
    },
    [basePath, router]
  );

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    apply(value);
  };

  return (
    <form
      onSubmit={onSubmit}
      className={`flex w-full max-w-xl gap-2 ${className}`}
      role="search"
    >
      <div className="relative min-w-0 flex-1">
        <FiSearch
          className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-muted"
          aria-hidden
        />
        <input
          type="search"
          name="q"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search dishes in this category…"
          className="min-h-11 w-full rounded-xl border border-black/[0.08] bg-white py-2.5 pl-10 pr-3 text-sm text-brand-dark shadow-sm outline-none ring-brand-primary/0 transition placeholder:text-brand-muted/80 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
          autoComplete="off"
        />
      </div>
      <button
        type="submit"
        className="shrink-0 rounded-xl bg-brand-dark px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark/90"
      >
        Search
      </button>
    </form>
  );
}
