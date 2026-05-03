"use client";

import { useRouter } from "next/navigation";
import { MdClose } from "react-icons/md";
import VerifyEmailPanel from "@/components/auth/VerifyEmailPanel";

type VerifyEmailModalProps = {
  email: string;
  onClose: () => void;
};

export default function VerifyEmailModal({ email, onClose }: VerifyEmailModalProps) {
  const router = useRouter();

  const handleVerified = () => {
    onClose();
    router.push("/login?verified=1");
  };

  return (
    <div
      className="fixed inset-0 z-[180] flex items-end justify-center p-0 sm:items-center sm:p-4"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 z-0 bg-black/55 backdrop-blur-[2px]"
        aria-label="Dismiss verification reminder"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="verify-email-heading"
        className="relative z-10 max-h-[min(92dvh,720px)] w-full max-w-md overflow-y-auto rounded-t-[1.25rem] bg-white px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-6 shadow-2xl ring-1 ring-black/10 sm:rounded-3xl sm:p-8"
      >
        <div className="mb-4 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-brand-muted transition-colors hover:bg-neutral-100 hover:text-brand-dark"
            aria-label="Close"
          >
            <MdClose className="text-2xl" />
          </button>
        </div>
        <VerifyEmailPanel
          email={email}
          headingId="verify-email-heading"
          onVerified={handleVerified}
          showBackToLoginLink={false}
        />
      </div>
    </div>
  );
}
