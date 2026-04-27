"use client";

/**
 * Auth entry overlay — split marketing + actions.
 * Responsive: bottom-anchored sheet on small screens (thumb reach), centered from `sm`.
 * `flex-col-reverse` below `md` puts the form block first while keeping promo left on desktop.
 */

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useId } from "react";
import type { MouseEvent } from "react";
import { AiFillStar } from "react-icons/ai";
import { FaApple, FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdClose } from "react-icons/md";
import Swal from "sweetalert2";
import { useAuthModal } from "@/contexts/auth-modal-context";
import useAuth from "@/hooks/useAuth";
import usePublic from "@/hooks/usePublic";

export default function AuthEntryModal() {
  const { isOpen, closeAuthModal } = useAuthModal();
  const { signInWithGoogle } = useAuth();
  const axiosPublic = usePublic();
  const router = useRouter();
  const titleId = useId();
  const descId = useId();

  const handleBackdropClose = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      if (e.target === e.currentTarget) closeAuthModal();
    },
    [closeAuthModal]
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAuthModal();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, closeAuthModal]);

  const handleGoogle = () => {
    signInWithGoogle()
      .then((result) => {
        const email = result.user.email;
        const name = result.user.displayName;
        axiosPublic.post("/user", { email, name }).catch(() => {});
        closeAuthModal();
        router.push("/");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Logged in successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch(() => {});
  };

  const handleComingSoon = (name: string) => {
    Swal.fire({
      icon: "info",
      title: `${name} is not connected yet`,
      text: "Use Google or email on the next screen.",
      timer: 2200,
      showConfirmButton: false,
    });
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[150] flex items-end justify-center p-0 sm:items-center sm:p-4 md:p-6"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 z-0 bg-black/55 backdrop-blur-[2px]"
        aria-label="Close dialog"
        onClick={handleBackdropClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        className="relative z-10 flex max-h-[92dvh] w-full max-w-5xl flex-col-reverse overflow-hidden rounded-t-[1.25rem] bg-brand-background shadow-2xl ring-1 ring-black/10 sm:max-h-[min(90dvh,720px)] sm:rounded-3xl md:max-h-[min(88dvh,720px)] md:flex-row md:rounded-3xl"
      >
        {/* Left — promo (below auth on narrow screens due to flex-col-reverse) */}
        <aside className="flex max-h-[38dvh] min-h-0 shrink-0 flex-col justify-center gap-4 overflow-y-auto overscroll-contain border-t border-white/10 bg-neutral-900 px-5 py-6 text-center text-white sm:max-h-none sm:gap-6 sm:px-8 sm:py-10 md:max-h-none md:w-[min(46%,420px)] md:flex-[0_0_auto] md:border-t-0 md:px-10 md:py-12">
          <div className="mx-auto flex aspect-square w-[min(9rem,36vw)] max-w-[200px] shrink-0 items-center justify-center rounded-2xl bg-white p-3 shadow-inner sm:w-44 sm:p-4 md:w-52">
            <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 border-2 border-dashed border-neutral-300 text-neutral-400">
              <span className="text-[0.65rem] font-medium uppercase tracking-wider sm:text-xs">
                QR code
              </span>
              <span className="text-[9px] leading-tight sm:text-[10px]">
                Download the Ganges Grill app
              </span>
            </div>
          </div>

          <p className="flex flex-wrap items-center justify-center gap-1 text-xs text-white/90 sm:text-sm">
            <span className="font-semibold">4.3</span>
            <AiFillStar className="text-base text-brand-primary sm:text-lg" aria-hidden />
            <span className="text-white/70">on 4.8M+ ratings</span>
          </p>

          <h2 className="text-base font-bold leading-snug sm:text-xl md:text-2xl">
            Download the app for{" "}
            <span className="text-brand-primary">40% off</span> your first order
          </h2>

          <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-center sm:gap-3">
            <span className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-black px-3 py-2 text-[0.65rem] font-semibold text-white sm:min-w-[130px] sm:text-xs">
              App Store
            </span>
            <span className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-black px-3 py-2 text-[0.65rem] font-semibold text-white sm:min-w-[130px] sm:text-xs">
              Google Play
            </span>
          </div>
        </aside>

        {/* Right — auth (first on screen for mobile = reverse column) */}
        <div className="relative flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto overscroll-contain bg-brand-background px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-12 sm:px-8 sm:pb-10 sm:pt-16 md:max-w-none md:flex-[1_1_58%] md:px-10">
          <button
            type="button"
            onClick={closeAuthModal}
            className="absolute right-3 top-3 inline-flex min-h-11 min-w-11 touch-manipulation items-center justify-center rounded-full text-brand-muted transition-colors hover:bg-brand-secondary/50 hover:text-brand-dark sm:right-4 sm:top-4"
            aria-label="Close"
          >
            <MdClose className="text-2xl" />
          </button>

          <div className="mb-6 text-center sm:mb-8 md:text-left">
            <h2
              id={titleId}
              className="text-xl font-bold tracking-tight text-brand-dark sm:text-2xl md:text-3xl"
            >
              Welcome!
            </h2>
            <p id={descId} className="mt-1.5 text-sm text-brand-muted sm:mt-2">
              Sign up or log in to continue
            </p>
          </div>

          <div className="flex flex-col gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={() => handleComingSoon("Facebook")}
              className="flex min-h-[44px] w-full touch-manipulation items-center justify-center gap-2 rounded-xl bg-[#1877F2] px-4 py-3 text-sm font-semibold text-white transition-opacity active:opacity-90 sm:gap-3 sm:py-3.5"
            >
              <FaFacebookF className="shrink-0 text-lg" aria-hidden />
              <span className="truncate">
                <span className="hidden sm:inline">Continue with </span>Facebook
              </span>
            </button>

            <button
              type="button"
              onClick={handleGoogle}
              className="flex min-h-[44px] w-full touch-manipulation items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm font-semibold text-brand-dark shadow-sm transition-colors active:bg-neutral-50 sm:gap-3 sm:py-3.5"
            >
              <FcGoogle className="shrink-0 text-xl" aria-hidden />
              Continue with Google
            </button>

            <button
              type="button"
              onClick={() => handleComingSoon("Apple")}
              className="flex min-h-[44px] w-full touch-manipulation items-center justify-center gap-2 rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white transition-opacity active:opacity-90 sm:gap-3 sm:py-3.5"
            >
              <FaApple className="shrink-0 text-xl" aria-hidden />
              Continue with Apple
            </button>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center" aria-hidden>
                <div className="w-full border-t border-neutral-200" />
              </div>
              <div className="relative flex justify-center text-[0.65rem] uppercase tracking-wide text-brand-muted sm:text-xs">
                <span className="bg-brand-background px-3">or</span>
              </div>
            </div>

            <Link
              href="/login"
              onClick={closeAuthModal}
              className="flex min-h-[44px] w-full touch-manipulation items-center justify-center rounded-xl bg-brand-primary px-4 py-3 text-sm font-semibold text-white shadow-sm transition-opacity active:opacity-90 sm:py-3.5"
            >
              Log in
            </Link>

            <Link
              href="/signUp"
              onClick={closeAuthModal}
              className="flex min-h-[44px] w-full touch-manipulation items-center justify-center rounded-xl border-2 border-neutral-200 bg-white px-4 py-3 text-sm font-semibold text-brand-dark transition-colors active:bg-brand-secondary/30 sm:py-3.5"
            >
              Sign up
            </Link>
          </div>

          <p className="mt-6 text-center text-[0.65rem] leading-relaxed text-brand-muted sm:mt-8 sm:text-xs md:mt-auto">
            By signing up, you agree to our{" "}
            <Link
              href="/contact"
              className="font-medium text-brand-primary underline-offset-2 hover:underline"
              onClick={closeAuthModal}
            >
              Terms and Conditions
            </Link>{" "}
            and{" "}
            <Link
              href="/contact"
              className="font-medium text-brand-primary underline-offset-2 hover:underline"
              onClick={closeAuthModal}
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
