"use client";

import { useEffect, useRef, useState } from "react";
import { AiOutlineGlobal } from "react-icons/ai";
import { FiCheck, FiChevronDown } from "react-icons/fi";
import { useLocale, type AppLocale } from "@/contexts/locale-context";

const OPTIONS: { value: AppLocale; label: string }[] = [
  { value: "en", label: "English" },
  { value: "bn", label: "বাংলা" },
];

function triggerCode(locale: AppLocale) {
  return locale === "bn" ? "BN" : "EN";
}

type LanguageSwitcherProps = {
  /** Floating dropdown (header desktop). */
  variant?: "dropdown" | "inline";
  /** Called after selecting a language (e.g. close mobile drawer). */
  onNavigate?: () => void;
  className?: string;
};

export default function LanguageSwitcher({
  variant = "dropdown",
  onNavigate,
  className = "",
}: LanguageSwitcherProps) {
  const { locale, setLocale } = useLocale();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open || variant !== "dropdown") return;
    const onDoc = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open, variant]);

  const pick = (next: AppLocale) => {
    setLocale(next);
    setOpen(false);
    onNavigate?.();
  };

  const optionButtons = (
    <>
      {OPTIONS.map(({ value, label }) => {
        const selected = locale === value;
        return (
          <button
            key={value}
            type="button"
            role="option"
            aria-selected={selected}
            onClick={() => pick(value)}
            className={`flex w-full items-center justify-between gap-3 rounded-2xl px-3 py-2.5 text-left text-sm font-medium text-brand-dark transition-colors ${
              selected ? "bg-neutral-100" : "hover:bg-neutral-50"
            }`}
          >
            <span>{label}</span>
            {selected ? (
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-primary/15"
                aria-hidden
              >
                <FiCheck className="text-lg text-brand-primary" strokeWidth={2.75} />
              </span>
            ) : (
              <span className="h-7 w-7 shrink-0" aria-hidden />
            )}
          </button>
        );
      })}
    </>
  );

  if (variant === "inline") {
    return (
      <div className={`rounded-2xl border border-black/[0.06] bg-white p-2 shadow-md ring-1 ring-black/5 ${className}`}>
        <p className="mb-1 px-2 text-[0.65rem] font-semibold uppercase tracking-wide text-brand-muted">
          Language
        </p>
        <div className="space-y-0.5" role="listbox">
          {optionButtons}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} ref={rootRef}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex cursor-pointer items-center gap-1.5 rounded-lg px-2 py-2 text-sm font-bold text-brand-dark outline-none ring-brand-primary ring-offset-2 ring-offset-brand-background hover:bg-brand-secondary/40 focus-visible:ring-2"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Choose language"
      >
        <AiOutlineGlobal className="text-lg text-brand-dark" aria-hidden />
        <span>{triggerCode(locale)}</span>
        <FiChevronDown
          className={`text-lg transition-transform duration-200 ${
            open ? "-rotate-180 text-brand-primary" : "text-brand-muted"
          }`}
          aria-hidden
        />
      </button>

      {open ? (
        <div
          className="absolute right-0 z-[80] mt-2 min-w-[220px] rounded-3xl border border-black/[0.06] bg-white p-2 shadow-xl ring-1 ring-black/5"
          role="listbox"
        >
          {optionButtons}
        </div>
      ) : null}
    </div>
  );
}
