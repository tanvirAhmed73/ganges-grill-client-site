import { Suspense } from "react";
import LoginForm from "@/components/auth/LoginForm";

export const metadata = {
  title: "Login",
};

function LoginFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-background">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-secondary border-t-brand-primary" />
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <LoginForm />
    </Suspense>
  );
}
