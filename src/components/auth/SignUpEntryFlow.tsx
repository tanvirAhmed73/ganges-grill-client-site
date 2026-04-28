"use client";

/**
 * Signup entry: email prefill + Google, aligned with login modal styling.
 */

import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { FcGoogle } from "react-icons/fc";
import { IoArrowBack } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import Swal from "sweetalert2";
import { useAuthModal } from "@/contexts/auth-modal-context";
import useAuth from "@/hooks/useAuth";
import usePublic from "@/hooks/usePublic";

const EMAIL_RE =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export default function SignUpEntryFlow({
  onBackToEntry,
  onSwitchToLogin,
}: {
  onBackToEntry?: () => void;
  onSwitchToLogin?: () => void;
} = {}) {
  const titleId = useId();
  const descId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { closeAuthModal, openAuthModal } = useAuthModal();
  const axiosPublic = usePublic();
  const auth = useAuth();

  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const emailValid = EMAIL_RE.test(email.trim());

  useEffect(() => {
    const t = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(t);
  }, []);

  const handleGoogle = () => {
    if (!auth?.signInWithGoogle) return;
    setSubmitting(true);
    auth
      .signInWithGoogle()
      .then((result: { user: { email: string | null; displayName: string | null } }) => {
        const e = result.user.email;
        const name = result.user.displayName;
        if (e) {
          axiosPublic.post("/user", { email: e, name }).catch(() => {});
        }
        closeAuthModal();
        router.push("/");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Welcome!",
          showConfirmButton: false,
          timer: 1600,
        });
      })
      .finally(() => setSubmitting(false));
  };

  const handleContinue = (e: FormEvent) => {
    e.preventDefault();
    if (!emailValid) return;
    const q = encodeURIComponent(email.trim());
    closeAuthModal();
    router.push(`/signUp?email=${q}`);
  };

  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-black/5 sm:rounded-3xl sm:p-8 md:max-w-[420px]">
      <div className="mb-4 flex items-center justify-between sm:mb-6">
        <button
          type="button"
          onClick={() =>
            onBackToEntry ? onBackToEntry() : closeAuthModal()
          }
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-brand-dark transition-colors hover:bg-neutral-100"
          aria-label="Back"
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

      <div className="mx-auto mb-6 flex h-28 w-full max-w-[180px] items-center justify-center rounded-2xl bg-brand-secondary/40 sm:h-32">
        <span className="text-4xl font-bold text-brand-primary" aria-hidden>
          GG
        </span>
      </div>

      <h2
        id={titleId}
        className="text-center text-2xl font-bold tracking-tight text-brand-dark"
      >
        Create your account
      </h2>
      <p id={descId} className="mt-2 text-center text-sm text-brand-muted">
        Enter your email to continue registration
      </p>

      <form onSubmit={handleContinue} className="mt-6 space-y-4">
        <label className="sr-only" htmlFor="signup-email">
          Email
        </label>
        <input
          ref={inputRef}
          id="signup-email"
          type="email"
          autoComplete="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3.5 text-brand-dark placeholder:text-neutral-400 outline-none transition-[box-shadow,border-color] focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/25"
        />

        <button
          type="submit"
          disabled={!emailValid || submitting}
          className={`w-full rounded-xl py-3.5 text-center text-base font-semibold transition-colors ${
            emailValid && !submitting
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

      <p className="mt-6 text-center text-sm text-brand-muted">
        Already have an account?{" "}
        <button
          type="button"
          className="font-semibold text-brand-primary underline-offset-2 hover:underline"
          onClick={() =>
            onSwitchToLogin ? onSwitchToLogin() : openAuthModal("login")
          }
        >
          Log in
        </button>
      </p>
    </div>
  );
}
