"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import VerifyEmailPanel from "@/components/auth/VerifyEmailPanel";
import { setPendingVerificationEmail } from "@/lib/auth/pending-verification";

export default function VerifyEmailClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email") ?? "";

  useEffect(() => {
    if (email.trim()) setPendingVerificationEmail(email.trim());
  }, [email]);

  const handleVerified = () => {
    router.push("/login?verified=1");
  };

  return (
    <div className="min-h-screen bg-brand-background px-4 py-12">
      <div className="mx-auto w-full max-w-md rounded-2xl border border-black/5 bg-white p-6 shadow-xl sm:p-8">
        <VerifyEmailPanel
          email={email}
          onVerified={handleVerified}
          showBackToLoginLink
        />
      </div>
    </div>
  );
}
