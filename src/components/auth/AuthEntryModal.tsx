"use client";

/**
 * Global auth: (1) split marketing + Welcome entry, (2) email/password flows.
 */

import type { MouseEvent } from "react";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import AuthGateModalEntry from "@/components/auth/AuthGateModalEntry";
import LoginEmailPasswordFlow from "@/components/auth/LoginEmailPasswordFlow";
import SignUpEntryFlow from "@/components/auth/SignUpEntryFlow";
import { useAuthModal } from "@/contexts/auth-modal-context";
import useAuth from "@/hooks/useAuth";
import usePublic from "@/hooks/usePublic";

type Phase = "entry" | "login" | "signup";

export default function AuthEntryModal() {
  const { isOpen, closeAuthModal, returnAfterLogin } = useAuthModal();
  const { signInWithGoogle } = useAuth();
  const axiosPublic = usePublic();
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("entry");

  useEffect(() => {
    if (isOpen) setPhase("entry");
  }, [isOpen]);

  const handleBackdropClose = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      if (e.target === e.currentTarget) closeAuthModal();
    },
    [closeAuthModal]
  );

  const finishSocialLogin = useCallback(() => {
    const dest =
      returnAfterLogin && returnAfterLogin.startsWith("/")
        ? returnAfterLogin
        : "/";
    closeAuthModal();
    router.push(dest);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "You're signed in",
      showConfirmButton: false,
      timer: 1600,
    });
  }, [closeAuthModal, returnAfterLogin, router]);

  const handleGoogleEntry = useCallback(() => {
    if (!signInWithGoogle) return;
    signInWithGoogle()
      .then((result) => {
        const email = result.user.email;
        const name = result.user.displayName;
        if (email) {
          axiosPublic.post("/user", { email, name }).catch(() => {});
        }
        finishSocialLogin();
      })
      .catch(() => {});
  }, [axiosPublic, finishSocialLogin, signInWithGoogle]);

  const handleComingSoon = useCallback((name: string) => {
    Swal.fire({
      icon: "info",
      title: `${name} is not connected yet`,
      text: "Use Google or email on the next screen.",
      timer: 2200,
      showConfirmButton: false,
    });
  }, []);

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

  if (!isOpen) return null;

  const dialogLabel =
    phase === "entry"
      ? "Sign in or sign up"
      : phase === "login"
        ? "Log in"
        : "Create account";

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
        aria-label={dialogLabel}
        className="relative z-10 flex w-full max-h-[min(92dvh,900px)] justify-center overflow-y-auto overscroll-contain px-3 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 sm:max-h-[min(90dvh,900px)] sm:px-4 sm:py-2 md:py-4"
      >
        {phase === "entry" ? (
          <AuthGateModalEntry
            onClose={closeAuthModal}
            onFacebook={() => handleComingSoon("Facebook")}
            onGoogle={handleGoogleEntry}
            onApple={() => handleComingSoon("Apple")}
            onChooseLogin={() => setPhase("login")}
            onChooseSignUp={() => setPhase("signup")}
          />
        ) : null}

        {phase === "login" ? (
          <div className="mx-auto flex min-h-0 w-full max-w-md justify-center sm:max-w-none">
            <LoginEmailPasswordFlow
              onLeaveLoginFlow={() => setPhase("entry")}
            />
          </div>
        ) : null}

        {phase === "signup" ? (
          <div className="mx-auto flex min-h-0 w-full max-w-md justify-center sm:max-w-none">
            <SignUpEntryFlow
              onBackToEntry={() => setPhase("entry")}
              onSwitchToLogin={() => setPhase("login")}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
