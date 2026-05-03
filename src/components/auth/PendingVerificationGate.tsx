"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import VerifyEmailModal from "@/components/auth/VerifyEmailModal";
import {
  getPendingVerificationEmail,
  setPendingVerificationEmail,
} from "@/lib/auth/pending-verification";

/**
 * If registration finished but OTP was never completed, persist the email and
 * show the verify modal again on return (until verified).
 */
export default function PendingVerificationGate() {
  const pathname = usePathname();
  const { user, loading } = useAuth();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    if (loading) return;

    if (pathname?.startsWith("/verify-email")) {
      if (typeof window !== "undefined") {
        const q = new URLSearchParams(window.location.search).get("email");
        if (q?.trim()) setPendingVerificationEmail(q.trim());
      }
      setOpen(false);
      return;
    }

    if (user) {
      setOpen(false);
      return;
    }

    const pending = getPendingVerificationEmail();
    if (!pending) {
      setOpen(false);
      return;
    }

    setEmail(pending);
    setOpen(true);
  }, [loading, pathname, user]);

  const handleClose = () => {
    setOpen(false);
  };

  if (!open || !email) return null;

  return <VerifyEmailModal email={email} onClose={handleClose} />;
}
