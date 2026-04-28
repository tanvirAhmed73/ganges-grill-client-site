"use client";

import { getAuth, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getClientFirebaseApp } from "@/lib/firebase/client";

/**
 * Completes Firebase email-link sign-in. User must open the link on the same
 * browser where they requested it (localStorage `emailForSignIn`).
 */
export default function CompleteEmailLinkPage() {
  const router = useRouter();
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const app = getClientFirebaseApp();
    if (!app) {
      setStatus("error");
      setMessage("Sign-in is not available right now.");
      return;
    }
    const auth = getAuth(app);
    if (typeof window === "undefined") return;
    const href = window.location.href;

    if (!isSignInWithEmailLink(auth, href)) {
      setStatus("error");
      setMessage("This link is invalid or has already been used.");
      return;
    }

    const email = window.localStorage.getItem("emailForSignIn");
    if (!email) {
      setStatus("error");
      setMessage(
        "Open this link in the same browser where you asked for a sign-in link."
      );
      return;
    }

    signInWithEmailLink(auth, email, href)
      .then(() => {
        window.localStorage.removeItem("emailForSignIn");
        setStatus("done");
        router.replace("/");
      })
      .catch(() => {
        setStatus("error");
        setMessage("Could not complete sign-in. Request a new link from the log in screen.");
      });
  }, [router]);

  if (status === "done" || status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-brand-background px-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-secondary border-t-brand-primary" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-brand-background px-4">
      <p className="max-w-md text-center text-sm text-brand-muted">{message}</p>
      <Link
        href="/"
        className="mt-6 text-sm font-semibold text-brand-primary underline-offset-2 hover:underline"
      >
        Back to home
      </Link>
    </div>
  );
}
