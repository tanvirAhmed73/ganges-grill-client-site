import { Suspense } from "react";
import SignUpForm from "@/components/auth/SignUpForm";

export const metadata = {
  title: "Sign Up",
};

function SignUpFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-background">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-secondary border-t-brand-primary" />
    </div>
  );
}

export default function SignUpPage() {
  return (
    <Suspense fallback={<SignUpFallback />}>
      <SignUpForm />
    </Suspense>
  );
}
