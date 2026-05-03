"use client";

/**
 * Email → password login against backend `POST /auth/login` (`docs/auth-api.md`).
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
import { IoArrowBack, IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import Swal from "sweetalert2";
import { useAuthModal } from "@/contexts/auth-modal-context";
import useAuth from "@/hooks/useAuth";

const EMAIL_RE =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

function apiErrorMessage(err: unknown): string {
  const e = err as {
    response?: { data?: { message?: string; error?: string } };
    message?: string;
  };
  const msg =
    e.response?.data?.message ??
    e.response?.data?.error ??
    e.message;
  return typeof msg === "string" ? msg : "Could not sign you in. Please try again.";
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
  onLeaveLoginFlow?: () => void;
} = {}) {
  const titleId = useId();
  const descId = useId();
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const { closeAuthModal, returnAfterLogin } = useAuthModal();
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

  const handleEmailContinue = (e: FormEvent) => {
    e.preventDefault();
    if (!canContinueEmail) return;
    setFieldError("");
    setStep("password");
  };

  const handlePasswordSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmitPassword || !auth?.signIn) return;
    setSubmitting(true);
    setFieldError("");
    try {
      await auth.signIn(email.trim(), password);
      finishLogin();
    } catch (err) {
      setFieldError(apiErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
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
            We&apos;ll sign you in with your password
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
            Enter your password. Your email must be verified before you can log
            in.
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

            {fieldError ? (
              <p className="text-sm text-red-600" role="alert">
                {fieldError}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={!canSubmitPassword || submitting}
              className={`w-full rounded-xl py-3.5 text-center text-base font-semibold transition-colors ${
                canSubmitPassword && !submitting
                  ? "cursor-pointer bg-brand-primary text-white hover:bg-brand-primary/90"
                  : "cursor-not-allowed bg-neutral-200 text-white"
              }`}
            >
              {submitting ? "Signing in…" : "Log in"}
            </button>

            <p className="text-center text-sm text-brand-muted">
              New here?{" "}
              <Link
                href={`/verify-email?email=${encodeURIComponent(email.trim())}`}
                className="font-semibold text-brand-primary underline-offset-2 hover:underline"
                onClick={closeAuthModal}
              >
                Verify your email
              </Link>
            </p>
          </form>
        </div>
      )}
    </div>
  );
}
