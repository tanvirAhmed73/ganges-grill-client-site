"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { useAuthModal } from "@/contexts/auth-modal-context";

/**
 * Dedicated /login route for redirects (e.g. private routes). Opens the global
 * login modal and preserves `?from=` for post-login navigation.
 */
export default function LoginPageClient() {
  const searchParams = useSearchParams();
  const { openAuthModal } = useAuthModal();
  const router = useRouter();
  const opened = useRef(false);

  useEffect(() => {
    if (opened.current) return;
    opened.current = true;
    const from = searchParams.get("from");
    openAuthModal("login", from);
  }, [openAuthModal, searchParams]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-brand-background px-4 py-16">
      <p className="max-w-sm text-center text-sm text-brand-muted">
        Use the sign-in window to continue. If it did not appear, go back to{" "}
        <Link
          href="/"
          className="font-semibold text-brand-primary underline-offset-2 hover:underline"
        >
          home
        </Link>{" "}
        and choose <span className="font-medium text-brand-dark">Log in</span>.
      </p>
      <button
        type="button"
        onClick={() => router.back()}
        className="mt-6 text-sm font-semibold text-brand-primary underline-offset-2 hover:underline"
      >
        Go back
      </button>
    </div>
  );
}
