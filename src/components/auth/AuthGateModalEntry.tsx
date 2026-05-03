"use client";

/**
 * First screen of auth: promo column + Welcome + email/password entry points.
 * OAuth removed — app uses backend email + password (`docs/auth-api.md`).
 */

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { MouseEvent } from "react";
import { useId } from "react";
import { AiFillStar } from "react-icons/ai";
import { MdClose } from "react-icons/md";

export interface AuthGateModalEntryProps {
  onClose: () => void;
  onChooseLogin: () => void;
  onChooseSignUp: () => void;
}

export default function AuthGateModalEntry({
  onClose,
  onChooseLogin,
  onChooseSignUp,
}: AuthGateModalEntryProps) {
  const router = useRouter();
  const titleId = useId();
  const descId = useId();

  const goContact = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClose();
    router.push("/contact");
  };

  return (
    <div
      aria-labelledby={titleId}
      aria-describedby={descId}
      className="relative flex max-h-[min(92dvh,720px)] w-full max-w-5xl flex-col-reverse overflow-hidden rounded-t-[1.25rem] bg-brand-background shadow-2xl ring-1 ring-black/10 sm:max-h-[min(90dvh,720px)] sm:rounded-3xl md:flex-row md:rounded-3xl"
    >
      <aside className="hidden max-h-[38dvh] min-h-0 shrink-0 flex-col justify-center gap-4 overflow-y-auto overscroll-contain border-t border-white/10 bg-[#333333] px-5 py-6 text-center text-white lg:flex lg:max-h-none lg:w-[min(46%,420px)] lg:flex-[0_0_auto] lg:border-t-0 lg:px-10 lg:py-12">
        <div className="mx-auto flex aspect-square w-[min(9rem,36vw)] max-w-[200px] shrink-0 items-center justify-center rounded-2xl bg-white p-3 shadow-inner lg:w-52 lg:p-4">
          <div className="flex h-full w-full flex-col items-center justify-center gap-1 border-2 border-dashed border-neutral-300 text-neutral-400">
            <span className="rounded bg-brand-primary px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wide text-white">
              GG
            </span>
            <span className="text-[0.65rem] font-medium uppercase tracking-wider">
              QR code
            </span>
            <span className="px-2 text-[9px] leading-tight">
              Download the Ganges Grill app
            </span>
          </div>
        </div>

        <p className="flex flex-wrap items-center justify-center gap-1 text-xs text-white/90 lg:text-sm">
          <span className="font-semibold">4.3</span>
          <AiFillStar className="text-base text-brand-primary lg:text-lg" aria-hidden />
          <span className="text-white/70">on 4.8M+ ratings</span>
        </p>

        <h3 className="text-base font-bold leading-snug lg:text-2xl">
          Download the app for{" "}
          <span className="text-brand-primary">40% off</span> your first order
        </h3>

        <div className="grid grid-cols-2 gap-2 lg:flex lg:flex-wrap lg:justify-center lg:gap-3">
          <span className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-white/80 bg-transparent px-3 py-2 text-[0.65rem] font-semibold text-white lg:min-w-[130px] lg:text-xs">
            App Store
          </span>
          <span className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-white/80 bg-transparent px-3 py-2 text-[0.65rem] font-semibold text-white lg:min-w-[130px] lg:text-xs">
            Google Play
          </span>
        </div>
      </aside>

      <div className="relative flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto overscroll-contain bg-white px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-12 sm:px-8 sm:pb-10 sm:pt-16 lg:max-w-none lg:flex-[1_1_58%] lg:px-10">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 inline-flex min-h-11 min-w-11 touch-manipulation items-center justify-center rounded-full text-brand-muted transition-colors hover:bg-neutral-100 hover:text-brand-dark sm:right-4 sm:top-4"
          aria-label="Close"
        >
          <MdClose className="text-2xl" />
        </button>

        <div className="mb-6 text-center sm:mb-8 lg:text-left">
          <h2
            id={titleId}
            className="text-xl font-bold tracking-tight text-brand-dark sm:text-2xl lg:text-3xl"
          >
            Welcome!
          </h2>
          <p id={descId} className="mt-1.5 text-sm text-brand-muted sm:mt-2">
            Sign up or log in with your email
          </p>
        </div>

        <div className="flex flex-col gap-2.5 sm:gap-3">
          <button
            type="button"
            onClick={onChooseLogin}
            className="flex min-h-[44px] w-full touch-manipulation items-center justify-center rounded-xl bg-brand-primary px-4 py-3 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-95 active:opacity-90 sm:py-3.5"
          >
            Log in
          </button>

          <button
            type="button"
            onClick={onChooseSignUp}
            className="flex min-h-[44px] w-full touch-manipulation items-center justify-center rounded-xl border-2 border-neutral-200 bg-white px-4 py-3 text-sm font-semibold text-brand-dark transition-colors hover:bg-neutral-50 active:bg-neutral-50 sm:py-3.5"
          >
            Sign up
          </button>
        </div>

        <p className="mt-6 text-center text-[0.65rem] leading-relaxed text-brand-muted sm:mt-8 sm:text-xs lg:mt-auto">
          By signing up, you agree to our{" "}
          <Link
            href="/contact"
            className="font-medium text-brand-primary underline-offset-2 hover:underline"
            onClick={goContact}
          >
            Terms and Conditions
          </Link>{" "}
          and{" "}
          <Link
            href="/contact"
            className="font-medium text-brand-primary underline-offset-2 hover:underline"
            onClick={goContact}
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
