"use client";

import SignUpWizard from "./SignUpWizard";

export default function SignUpEntryFlow({
  onBackToEntry,
  onSwitchToLogin,
}: {
  onBackToEntry?: () => void;
  onSwitchToLogin?: () => void;
} = {}) {
  return (
    <SignUpWizard
      layout="modal"
      onBackToEntry={onBackToEntry}
      onSwitchToLogin={onSwitchToLogin}
    />
  );
}
