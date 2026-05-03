import { Suspense } from "react";
import VerifyEmailClient from "./VerifyEmailClient";

export const metadata = {
  title: "Verify email",
};

function Fallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-background">
      <div className="h-9 w-9 animate-spin rounded-full border-2 border-brand-secondary border-t-brand-primary" />
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<Fallback />}>
      <VerifyEmailClient />
    </Suspense>
  );
}
