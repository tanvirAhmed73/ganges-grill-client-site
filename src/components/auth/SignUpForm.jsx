"use client";

import { useSearchParams } from "next/navigation";
import SignUpWizard from "./SignUpWizard";

export default function SignUpForm() {
  const searchParams = useSearchParams();
  const emailFromQuery = searchParams.get("email") || "";

  return (
    <SignUpWizard layout="page" initialEmail={emailFromQuery} />
  );
}
