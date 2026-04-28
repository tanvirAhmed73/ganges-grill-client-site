"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type AppLocale = "en" | "bn";

const STORAGE_KEY = "ganges-locale";

type LocaleContextValue = {
  locale: AppLocale;
  setLocale: (next: AppLocale) => void;
};

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);

function readStoredLocale(): AppLocale {
  if (typeof window === "undefined") return "en";
  try {
    const s = localStorage.getItem(STORAGE_KEY);
    if (s === "bn" || s === "en") return s;
  } catch {
    /* ignore */
  }
  return "en";
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<AppLocale>("en");

  useEffect(() => {
    const next = readStoredLocale();
    setLocaleState(next);
    document.documentElement.lang = next === "bn" ? "bn" : "en";
  }, []);

  const setLocale = useCallback((next: AppLocale) => {
    setLocaleState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
    document.documentElement.lang = next === "bn" ? "bn" : "en";
  }, []);

  const value = useMemo<LocaleContextValue>(
    () => ({ locale, setLocale }),
    [locale, setLocale]
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (ctx === undefined) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return ctx;
}
