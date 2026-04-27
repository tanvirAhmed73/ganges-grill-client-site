"use client";

/**
 * TopPromoBanner — slim dismissible promo strip for anonymous visitors only.
 *
 * Persistence (localStorage):
 * 1. On dismiss → write TOP_PROMO_BANNER_CLOSED_KEY = "true"
 * 2. On subsequent visits → read same key before showing anything
 * 3. If "true" → banner stays hidden across reloads until key is cleared
 *
 * SSR / flicker:
 * - We render nothing until auth has finished loading AND we've evaluated storage,
 *   so logged-in users never flash the bar and dismissed users don't flash then hide.
 *
 * Responsive:
 * - Stacks CTAs on narrow viewports; touch-friendly targets (min 44px); safe-area padding.
 */

import { useCallback, useEffect, useState } from "react";
import { MdOutlineShoppingBag } from "react-icons/md";
import { useAuthModal } from "@/contexts/auth-modal-context";
import useAuth from "@/hooks/useAuth";
import { TOP_PROMO_BANNER_CLOSED_KEY } from "@/lib/storage-keys";

export default function TopPromoBanner() {
  const { user, loading } = useAuth();
  const { openAuthModal } = useAuthModal();

  /**
   * undefined = still deciding (no DOM for banner yet — avoids flicker)
   * true      = show banner
   * false     = hide (logged-in, dismissed in storage, or dismissed this session)
   */
  const [shouldShow, setShouldShow] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    if (loading) return;

    let closedInStorage = false;
    try {
      closedInStorage =
        typeof window !== "undefined" &&
        window.localStorage.getItem(TOP_PROMO_BANNER_CLOSED_KEY) === "true";
    } catch {
      closedInStorage = false;
    }

    const allowForAnonymous = !user;
    setShouldShow(!closedInStorage && allowForAnonymous);
  }, [loading, user]);

  const handleDismiss = useCallback(() => {
    try {
      window.localStorage.setItem(TOP_PROMO_BANNER_CLOSED_KEY, "true");
    } catch {
      // Still hide UI even if persistence fails
    }
    setShouldShow(false);
  }, []);

  if (shouldShow !== true) {
    return null;
  }

  return (
    <div
      className="relative z-[100] w-full border-b border-white/15 bg-brand-primary pt-[env(safe-area-inset-top,0px)] text-white"
      role="region"
      aria-label="Promotional announcement"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-3 py-3 pr-14 sm:flex-row sm:items-center sm:gap-4 sm:px-4 sm:py-2.5 sm:pr-16 md:gap-6">
        <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 md:gap-6">
          <div className="flex shrink-0 items-center gap-2 sm:self-center">
            <MdOutlineShoppingBag
              className="text-xl text-white/95 sm:text-2xl"
              aria-hidden
            />
            <span className="text-xs font-semibold uppercase tracking-wide text-white/90 sm:hidden">
              Partner offers
            </span>
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-center md:justify-start md:gap-4 lg:gap-6">
            <button
              type="button"
              onClick={() => openAuthModal("signup")}
              className="inline-flex min-h-[44px] w-full touch-manipulation items-center justify-center rounded-lg border border-white/90 px-3 py-2.5 text-center text-[0.7rem] font-semibold uppercase leading-snug tracking-wide text-white transition-colors hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:bg-white/10 sm:min-h-0 sm:min-w-[min(100%,280px)] sm:flex-1 sm:px-4 sm:py-2.5 sm:text-xs md:max-w-[340px] md:flex-none md:text-sm"
            >
              Sign up to be a restaurant partner
            </button>

            <button
              type="button"
              onClick={() => openAuthModal("signup")}
              className="inline-flex min-h-[44px] w-full touch-manipulation items-center justify-center rounded-lg border border-white/90 px-3 py-2.5 text-center text-[0.7rem] font-semibold uppercase leading-snug tracking-wide text-white transition-colors hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:bg-white/10 sm:min-h-0 sm:min-w-[min(100%,280px)] sm:flex-1 sm:px-4 sm:py-2.5 sm:text-xs md:max-w-[340px] md:flex-none md:text-sm"
            >
              Sign up for a business account
            </button>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={handleDismiss}
        className="absolute right-2 top-[max(0.5rem,calc(env(safe-area-inset-top,0px)+0.25rem))] flex min-h-11 min-w-11 touch-manipulation items-center justify-center rounded-md text-white transition-colors hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-4 sm:top-1/2 sm:-translate-y-1/2 sm:transform"
        aria-label="Close promotional banner"
      >
        <span className="text-2xl leading-none" aria-hidden>
          ×
        </span>
      </button>
    </div>
  );
}
