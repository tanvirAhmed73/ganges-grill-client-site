"use client";

/**
 * Step-by-step signup: email → name → password → confirm (matches login UX).
 */

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { IoArrowBack } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import Swal from "sweetalert2";
import { useAuthModal } from "@/contexts/auth-modal-context";
import { AuthContext } from "@/providers/AuthProvider";

const EMAIL_RE =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const PASSWORD_PATTERN =
  /^(?=.*[0-9])(?=.*[-?!@#$%^&*/\\])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9-?!@#$%^&*/\\]{8,30}$/;

/** @typedef {'email' | 'name' | 'password' | 'confirm'} SignStep */

export default function SignUpWizard({
  layout = "modal",
  onBackToEntry,
  onSwitchToLogin,
  initialEmail = "",
}) {
  const titleId = useId();
  const descId = useId();
  const inputRef = useRef(null);
  const router = useRouter();
  const { closeAuthModal, openAuthModal } = useAuthModal();
  const { register } = useContext(AuthContext);

  const [step, setStep] = useState(
    /** @type {'email' | 'name' | 'password' | 'confirm'} */ ("email")
  );
  const [email, setEmail] = useState(initialEmail);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [fieldError, setFieldError] = useState("");

  const isModal = layout === "modal";

  useEffect(() => {
    if (initialEmail) setEmail(initialEmail);
  }, [initialEmail]);

  useEffect(() => {
    const t = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(t);
  }, [step]);

  const emailValid = EMAIL_RE.test(email.trim());
  const nameOk = name.trim().length >= 2;
  const passwordOk =
    password.length >= 8 && PASSWORD_PATTERN.test(password);
  const confirmOk =
    confirmPassword === password && confirmPassword.length > 0;

  const goBack = useCallback(() => {
    setFieldError("");
    if (step === "name") {
      setStep("email");
      return;
    }
    if (step === "password") {
      setStep("name");
      return;
    }
    if (step === "confirm") {
      setStep("password");
      return;
    }
    if (step === "email") {
      if (isModal && onBackToEntry) onBackToEntry();
      else router.back();
    }
  }, [step, isModal, onBackToEntry, router]);

  const handleEmailNext = (e) => {
    e.preventDefault();
    if (!emailValid) return;
    setFieldError("");
    setStep("name");
  };

  const handleNameNext = (e) => {
    e.preventDefault();
    if (!nameOk) return;
    setFieldError("");
    setStep("password");
  };

  const handlePasswordNext = (e) => {
    e.preventDefault();
    if (!PASSWORD_PATTERN.test(password)) {
      setFieldError(
        "Use 8–30 characters with upper, lower, number, and special character."
      );
      return;
    }
    setFieldError("");
    setStep("confirm");
  };

  const handleConfirmSubmit = async (e) => {
    e.preventDefault();
    if (!confirmOk) {
      setFieldError("Passwords must match.");
      return;
    }
    if (!PASSWORD_PATTERN.test(password)) {
      setFieldError("Password does not meet requirements.");
      return;
    }
    setSubmitting(true);
    setFieldError("");
    try {
      await register({
        email: email.trim(),
        password,
        name: name.trim(),
      });
      const verifyUrl = `/verify-email?email=${encodeURIComponent(email.trim())}`;
      if (isModal) closeAuthModal();
      router.push(verifyUrl);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Check your email for a verification code",
        showConfirmButton: false,
        timer: 2200,
      });
    } catch (err) {
      const msg =
        err?.response?.data?.message ??
        err?.response?.data?.error ??
        "Registration failed";
      setFieldError(typeof msg === "string" ? msg : "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  const cardClass =
    "w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-black/5 sm:rounded-3xl sm:p-8 md:max-w-[420px]";

  const inputClass =
    "w-full rounded-xl border border-neutral-300 bg-white px-4 py-3.5 text-brand-dark placeholder:text-neutral-400 outline-none transition-[box-shadow,border-color] focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/25";

  const primaryBtn = (enabled) =>
    `w-full rounded-xl py-3.5 text-center text-base font-semibold transition-colors ${
      enabled && !submitting
        ? "cursor-pointer bg-brand-primary text-white hover:bg-brand-primary/90"
        : "cursor-not-allowed bg-neutral-200 text-white"
    }`;

  const stepMeta = {
    email: {
      title: "What’s your email?",
      subtitle: "We’ll send a verification code after you finish signing up.",
      form: (
        <form onSubmit={handleEmailNext} className="mt-6 space-y-4">
          <label className="sr-only" htmlFor="su-email">
            Email
          </label>
          <input
            ref={inputRef}
            id="su-email"
            type="email"
            autoComplete="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setFieldError("");
            }}
            className={inputClass}
          />
          {fieldError ? (
            <p className="text-sm text-red-600" role="alert">
              {fieldError}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={!emailValid || submitting}
            className={primaryBtn(emailValid)}
          >
            Continue
          </button>
        </form>
      ),
    },
    name: {
      title: "What’s your name?",
      subtitle: "This is how we’ll greet you on your orders.",
      form: (
        <form onSubmit={handleNameNext} className="mt-6 space-y-4">
          <label className="sr-only" htmlFor="su-name">
            Name
          </label>
          <input
            ref={inputRef}
            id="su-name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setFieldError("");
            }}
            className={inputClass}
          />
          {fieldError ? (
            <p className="text-sm text-red-600" role="alert">
              {fieldError}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={!nameOk || submitting}
            className={primaryBtn(nameOk)}
          >
            Continue
          </button>
        </form>
      ),
    },
    password: {
      title: "Create a password",
      subtitle:
        "8–30 characters: uppercase, lowercase, number, and a special character.",
      form: (
        <form onSubmit={handlePasswordNext} className="mt-6 space-y-4">
          <label className="sr-only" htmlFor="su-password">
            Password
          </label>
          <input
            ref={inputRef}
            id="su-password"
            type="password"
            autoComplete="new-password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setFieldError("");
            }}
            className={inputClass}
          />
          {fieldError ? (
            <p className="text-sm text-red-600" role="alert">
              {fieldError}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={!passwordOk || submitting}
            className={primaryBtn(passwordOk)}
          >
            Continue
          </button>
        </form>
      ),
    },
    confirm: {
      title: "Confirm your password",
      subtitle: "Re-enter the same password to continue.",
      form: (
        <form onSubmit={handleConfirmSubmit} className="mt-6 space-y-4">
          <label className="sr-only" htmlFor="su-confirm">
            Confirm password
          </label>
          <input
            ref={inputRef}
            id="su-confirm"
            type="password"
            autoComplete="new-password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setFieldError("");
            }}
            className={inputClass}
          />
          {fieldError ? (
            <p className="text-sm text-red-600" role="alert">
              {fieldError}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={!confirmOk || submitting}
            className={primaryBtn(confirmOk)}
          >
            {submitting ? "Creating account…" : "Create account"}
          </button>
        </form>
      ),
    },
  };

  const meta = stepMeta[step];

  const headerBack =
    step === "email" && !isModal ? (
      <Link
        href="/"
        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-brand-dark hover:bg-neutral-100"
        aria-label="Back to home"
      >
        <IoArrowBack className="text-xl" />
      </Link>
    ) : (
      <button
        type="button"
        onClick={goBack}
        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-brand-dark transition-colors hover:bg-neutral-100"
        aria-label="Back"
      >
        <IoArrowBack className="text-xl" />
      </button>
    );

  const inner = (
    <>
      <div className="mb-4 flex items-center justify-between sm:mb-6">
        {headerBack}
        {isModal ? (
          <button
            type="button"
            onClick={closeAuthModal}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-neutral-200 text-brand-muted transition-colors hover:bg-neutral-50"
            aria-label="Close"
          >
            <MdClose className="text-xl" />
          </button>
        ) : (
          <span className="min-h-11 min-w-11" aria-hidden />
        )}
      </div>

      <div className="mx-auto mb-6 flex h-24 w-full max-w-[160px] items-center justify-center rounded-2xl bg-brand-secondary/40 sm:h-28">
        <span className="text-3xl font-bold text-brand-primary sm:text-4xl" aria-hidden>
          GG
        </span>
      </div>

      <h2
        id={titleId}
        className="text-center text-2xl font-bold tracking-tight text-brand-dark"
      >
        {meta.title}
      </h2>
      <p id={descId} className="mt-2 text-center text-sm text-brand-muted">
        {meta.subtitle}
      </p>

      {meta.form}

      <p className="mt-6 text-center text-sm text-brand-muted">
        Already have an account?{" "}
        <button
          type="button"
          className="font-semibold text-brand-primary underline-offset-2 hover:underline"
          onClick={() => {
            if (isModal) {
              if (onSwitchToLogin) onSwitchToLogin();
              else openAuthModal("login");
            } else {
              router.push("/login");
            }
          }}
        >
          Log in
        </button>
      </p>
    </>
  );

  if (layout === "page") {
    return (
      <div className="min-h-screen bg-brand-background px-4 py-10">
        <div className="mx-auto flex w-full max-w-md flex-col gap-6">
          <div className={`${cardClass} mx-auto`}>{inner}</div>
        </div>
      </div>
    );
  }

  return <div className={`${cardClass} mx-auto`}>{inner}</div>;
}
