"use client";

import Link from "next/link";
import { useState } from "react";
import Swal from "sweetalert2";
import useAuth from "@/hooks/useAuth";
import { clearPendingVerificationEmail } from "@/lib/auth/pending-verification";

function apiMessage(err) {
  const msg =
    err?.response?.data?.message ??
    err?.response?.data?.error ??
    err?.message;
  return typeof msg === "string" ? msg : "Something went wrong.";
}

/**
 * @param {{
 *   email: string;
 *   onVerified?: () => void;
 *   showBackToLoginLink?: boolean;
 *   className?: string;
 *   headingId?: string;
 * }} props
 */
export default function VerifyEmailPanel({
  email,
  onVerified,
  showBackToLoginLink = true,
  className = "",
  headingId,
}) {
  const { verifyEmail, resendVerification } = useAuth();
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [fieldError, setFieldError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !code.trim()) return;
    setBusy(true);
    setFieldError("");
    try {
      await verifyEmail(email.trim(), code.trim());
      clearPendingVerificationEmail();
      onVerified?.();
    } catch (err) {
      setFieldError(apiMessage(err));
    } finally {
      setBusy(false);
    }
  };

  const handleResend = async () => {
    if (!email.trim()) return;
    setBusy(true);
    try {
      await resendVerification(email.trim());
      Swal.fire({
        icon: "info",
        title: "Check your inbox",
        text: "If an account exists for this email, we sent a verification message.",
      });
    } catch {
      Swal.fire({
        icon: "info",
        title: "Check your inbox",
        text: "If an account exists for this email, we sent a verification message.",
      });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className={className}>
      <h1
        id={headingId}
        className="text-center text-2xl font-bold text-brand-dark"
      >
        Verify your email
      </h1>
      <p className="mt-2 text-center text-sm text-brand-muted">
        Enter the code we sent to{" "}
        <span className="font-semibold text-brand-dark">
          {email || "your email"}
        </span>
      </p>

      {!email ? (
        <p className="mt-6 text-center text-sm text-red-600">
          Missing email.{" "}
          <Link
            href="/signUp"
            className="font-semibold text-brand-primary underline"
          >
            Register again
          </Link>
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label
            className="block text-sm font-medium text-brand-dark"
            htmlFor="verify-otp"
          >
            Verification code
          </label>
          <input
            id="verify-otp"
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            placeholder="Enter code"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              setFieldError("");
            }}
            className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-brand-dark outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/25"
          />
          {fieldError ? (
            <p className="text-sm text-red-600" role="alert">
              {fieldError}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={busy || !code.trim()}
            className="w-full rounded-xl bg-brand-primary py-3 font-semibold text-white transition-opacity hover:opacity-95 disabled:opacity-50"
          >
            {busy ? "Verifying…" : "Verify & continue"}
          </button>
          <button
            type="button"
            onClick={handleResend}
            disabled={busy}
            className="w-full text-sm font-semibold text-brand-primary underline-offset-2 hover:underline disabled:opacity-50"
          >
            Resend code
          </button>
        </form>
      )}

      {showBackToLoginLink ? (
        <p className="mt-6 text-center text-sm text-brand-muted">
          <Link href="/login" className="font-medium text-brand-primary">
            Back to log in
          </Link>
        </p>
      ) : null}
    </div>
  );
}
