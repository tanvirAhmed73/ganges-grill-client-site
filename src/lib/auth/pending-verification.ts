/** Email pending OTP verification (register flow). Cleared only after successful verify. */

export const PENDING_VERIFICATION_EMAIL_KEY = "ganges-pending-verification-email";

export function getPendingVerificationEmail(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(PENDING_VERIFICATION_EMAIL_KEY);
    if (!raw || typeof raw !== "string") return null;
    const trimmed = raw.trim();
    return trimmed.length > 0 ? trimmed : null;
  } catch {
    return null;
  }
}

export function setPendingVerificationEmail(email: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(PENDING_VERIFICATION_EMAIL_KEY, email.trim());
  } catch {
    /* ignore */
  }
}

export function clearPendingVerificationEmail(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(PENDING_VERIFICATION_EMAIL_KEY);
  } catch {
    /* ignore */
  }
}
