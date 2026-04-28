"use client";

/**
 * Two-step email → password login (reference: marketplace-style auth UX).
 * Brand tokens: `brand-*` from Tailwind config.
 */

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { FcGoogle } from "react-icons/fc";
import { IoArrowBack, IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import Swal from "sweetalert2";
import { useAuthModal } from "@/contexts/auth-modal-context";
import useAuth from "@/hooks/useAuth";
import usePublic from "@/hooks/usePublic";

const EMAIL_RE =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

function firebaseAuthMessage(code: string): string {
  switch (code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
      return "Incorrect email or password.";
    case "auth/user-not-found":
      return "No account found for this email.";
    case "auth/too-many-requests":
      return "Too many attempts. Try again later.";
    case "auth/user-disabled":
      return "This account has been disabled.";
    default:
      return "Could not sign you in. Please try again.";
  }
}

function EnvelopeIllustration() {
  return (
    <div className="relative mx-auto mb-4 flex h-36 w-full max-w-[220px] items-center justify-center sm:h-40">
      <div
        className="absolute inset-x-6 top-4 h-24 rounded-full bg-gradient-to-br from-brand-secondary/80 via-brand-primary/20 to-brand-secondary/40 blur-2xl"
        aria-hidden
      />
      <svg
        viewBox="0 0 120 96"
        className="relative z-[1] h-28 w-auto drop-shadow-md sm:h-32"
        aria-hidden
      >
        <rect
          x="12"
          y="24"
          width="96"
          height="56"
          rx="10"
          className="fill-sky-100 stroke-sky-200"
          strokeWidth="2"
        />
        <path
          d="M12 34 L60 58 L108 34"
          className="stroke-sky-300"
          fill="none"
          strokeWidth="2"
        />
        <circle cx="60" cy="52" r="10" className="fill-brand-primary" />
        <text
          x="60"
          y="55"
          textAnchor="middle"
          fill="#ffffff"
          fontSize="9"
          fontWeight="700"
        >
          GG
        </text>
      </svg>
    </div>
  );
}

function PadlockIllustration() {
  return (
    <div className="relative mx-auto mb-4 flex h-36 w-full max-w-[220px] items-center justify-center sm:h-40">
      <div
        className="absolute inset-x-8 top-6 h-20 rounded-full bg-gradient-to-br from-brand-secondary/70 to-brand-primary/25 blur-2xl"
        aria-hidden
      />
      <svg
        viewBox="0 0 120 100"
        className="relative z-[1] h-28 w-auto drop-shadow-md sm:h-32"
        aria-hidden
      >
        <rect
          x="36"
          y="44"
          width="48"
          height="44"
          rx="8"
          className="fill-sky-600 stroke-sky-700"
          strokeWidth="2"
        />
        <path
          d="M44 44 V36 C44 22 52 14 60 14 C68 14 76 22 76 36 V44"
          className="stroke-sky-700"
          fill="none"
          strokeWidth="3"
        />
        <circle cx="60" cy="62" r="6" className="fill-sky-200" />
        <path
          d="M88 52 L98 62 L108 48"
          className="stroke-brand-primary"
          fill="none"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

type Step = "email" | "password";

export default function LoginEmailPasswordFlow({
  onLeaveLoginFlow,
}: {
  /** From email step, go back to marketing entry instead of closing the overlay. */
  onLeaveLoginFlow?: () => void;
} = {}) {
  const titleId = useId();
  const descId = useId();
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const { closeAuthModal, returnAfterLogin } = useAuthModal();
  const axiosPublic = usePublic();
  const auth = useAuth();

  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [fieldError, setFieldError] = useState("");

  const emailValid = EMAIL_RE.test(email.trim());
  const passwordOk = password.length >= 1;
  const canContinueEmail = emailValid && !submitting;
  const canSubmitPassword = passwordOk && !submitting;

  useEffect(() => {
    if (step === "email") {
      const t = requestAnimationFrame(() => emailInputRef.current?.focus());
      return () => cancelAnimationFrame(t);
    }
    const t = requestAnimationFrame(() => passwordInputRef.current?.focus());
    return () => cancelAnimationFrame(t);
  }, [step]);

  const finishLogin = useCallback(() => {
    const dest = returnAfterLogin && returnAfterLogin.startsWith("/")
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

  const handleGoogle = () => {
    if (!auth?.signInWithGoogle) return;
    setSubmitting(true);
    setFieldError("");
    auth
      .signInWithGoogle()
      .then((result) => {
        const e = result.user.email;
        const name = result.user.displayName;
        if (e) {
          axiosPublic.post("/user", { email: e, name }).catch(() => {});
        }
        finishLogin();
      })
      .catch(() => {
        setFieldError("Google sign-in was cancelled or failed.");
      })
      .finally(() => setSubmitting(false));
  };

  const handleEmailContinue = (e: FormEvent) => {
    e.preventDefault();
    if (!canContinueEmail) return;
    setFieldError("");
    setStep("password");
  };

  const handlePasswordSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmitPassword || !auth?.signIn) return;
    setSubmitting(true);
    setFieldError("");
    auth
      .signIn(email.trim(), password)
      .then(() => finishLogin())
      .catch((err: { code?: string }) => {
        setFieldError(firebaseAuthMessage(err?.code ?? ""));
      })
      .finally(() => setSubmitting(false));
  };

  const handleForgotPassword = () => {
    if (!email.trim() || !auth?.sendPasswordReset) return;
    setSubmitting(true);
    setFieldError("");
    auth
      .sendPasswordReset(email.trim())
      .then(() => {
        Swal.fire({
          icon: "info",
          title: "Check your email",
          text: "We sent a link to reset your password.",
          confirmButtonColor: "#FF6B35",
        });
      })
      .catch(() => {
        setFieldError("Could not send reset email. Try again.");
      })
      .finally(() => setSubmitting(false));
  };

  const handleSendLoginLink = () => {
    if (!email.trim() || !auth?.sendEmailSignInLink) return;
    setSubmitting(true);
    setFieldError("");
    try {
      window.localStorage.setItem("emailForSignIn", email.trim());
    } catch {
      /* ignore */
    }
    auth
      .sendEmailSignInLink(email.trim())
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Link sent",
          text: "Open the email we sent to sign in on this device.",
          confirmButtonColor: "#FF6B35",
        });
      })
      .catch(() => {
        setFieldError("Could not send sign-in link. Try password instead.");
      })
      .finally(() => setSubmitting(false));
  };

  const goBack = () => {
    setFieldError("");
    if (step === "password") {
      setPassword("");
      setStep("email");
      return;
    }
    if (onLeaveLoginFlow) {
      onLeaveLoginFlow();
      return;
    }
    closeAuthModal();
  };

  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-black/5 sm:rounded-3xl sm:p-8 md:max-w-[420px]">
      <div className="mb-4 flex items-center justify-between sm:mb-6">
        <button
          type="button"
          onClick={goBack}
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-brand-dark transition-colors hover:bg-neutral-100"
          aria-label={step === "password" ? "Back" : "Close"}
        >
          <IoArrowBack className="text-xl" />
        </button>
        <button
          type="button"
          onClick={closeAuthModal}
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-neutral-200 text-brand-muted transition-colors hover:bg-neutral-50"
          aria-label="Close"
        >
          <MdClose className="text-xl" />
        </button>
      </div>

      {step === "email" ? (
        <div>
          <EnvelopeIllustration />
          <h2
            id={titleId}
            className="text-center text-2xl font-bold tracking-tight text-brand-dark"
          >
            What&apos;s your email?
          </h2>
          <p
            id={descId}
            className="mt-2 text-center text-sm text-brand-muted"
          >
            We&apos;ll check if you have an account
          </p>

          <form onSubmit={handleEmailContinue} className="mt-6 space-y-4">
            <label className="sr-only" htmlFor="login-email">
              Email
            </label>
            <input
              ref={emailInputRef}
              id="login-email"
              type="email"
              autoComplete="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setFieldError("");
              }}
              className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3.5 text-brand-dark placeholder:text-neutral-400 outline-none transition-[box-shadow,border-color] focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/25"
            />
            {fieldError ? (
              <p className="text-sm text-red-600" role="alert">
                {fieldError}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={!canContinueEmail}
              className={`w-full rounded-xl py-3.5 text-center text-base font-semibold transition-colors ${
                canContinueEmail
                  ? "cursor-pointer bg-brand-primary text-white hover:bg-brand-primary/90"
                  : "cursor-not-allowed bg-neutral-200 text-white"
              }`}
            >
              Continue
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center" aria-hidden>
              <div className="w-full border-t border-neutral-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-wide text-brand-muted">
              <span className="bg-white px-3">or</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGoogle}
            disabled={submitting}
            className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm font-semibold text-brand-dark shadow-sm transition-colors hover:bg-neutral-50 disabled:opacity-60"
          >
            <FcGoogle className="text-xl" aria-hidden />
            Continue with Google
          </button>

          <p className="mt-8 text-center text-[0.7rem] leading-relaxed text-brand-muted sm:text-xs">
            By continuing you agree to our{" "}
            <Link
              href="/contact"
              className="font-medium text-brand-primary underline-offset-2 hover:underline"
              onClick={closeAuthModal}
            >
              Terms
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
      ) : (
        <div>
          <PadlockIllustration />
          <h2
            id={titleId}
            className="text-center text-2xl font-bold tracking-tight text-brand-dark"
          >
            Welcome back!
          </h2>
          <p
            id={descId}
            className="mt-3 text-center text-sm leading-relaxed text-brand-muted"
          >
            Log in by typing your password. We can also send a login link to
            your email.
          </p>
          <p className="mt-2 text-center text-sm font-semibold text-brand-dark">
            {email.trim()}
          </p>

          <form onSubmit={handlePasswordSubmit} className="mt-6 space-y-4">
            <div className="relative">
              <label className="sr-only" htmlFor="login-password">
                Password
              </label>
              <input
                ref={passwordInputRef}
                id="login-password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setFieldError("");
                }}
                className="w-full rounded-xl border border-neutral-300 bg-white py-3.5 pl-4 pr-12 text-brand-dark placeholder:text-neutral-400 outline-none transition-[box-shadow,border-color] focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/25"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-2 text-brand-primary hover:bg-brand-secondary/40"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <IoEyeOffOutline className="text-xl" />
                ) : (
                  <IoEyeOutline className="text-xl" />
                )}
              </button>
            </div>

            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-left text-sm font-semibold text-brand-dark underline-offset-2 hover:underline"
            >
              Forgot your password?
            </button>

            {fieldError ? (
              <p className="text-sm text-red-600" role="alert">
                {fieldError}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={!canSubmitPassword}
              className={`w-full rounded-xl py-3.5 text-center text-base font-semibold transition-colors ${
                canSubmitPassword
                  ? "cursor-pointer bg-brand-primary text-white hover:bg-brand-primary/90"
                  : "cursor-not-allowed bg-neutral-200 text-white"
              }`}
            >
              {submitting ? "Signing in…" : "Log in with password"}
            </button>

            <button
              type="button"
              onClick={handleSendLoginLink}
              disabled={submitting}
              className="w-full rounded-xl border-2 border-neutral-200 bg-white py-3.5 text-center text-base font-semibold text-brand-dark transition-colors hover:bg-neutral-50 disabled:opacity-60"
            >
              Send me a login link
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
