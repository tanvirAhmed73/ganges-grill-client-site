import {
  PENDING_VERIFICATION_EMAIL_KEY,
  clearPendingVerificationEmail,
  getPendingVerificationEmail,
  setPendingVerificationEmail,
} from "./pending-verification";

describe("pending-verification", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("stores and returns trimmed email", () => {
    setPendingVerificationEmail("  user@example.com  ");
    expect(getPendingVerificationEmail()).toBe("user@example.com");
    expect(localStorage.getItem(PENDING_VERIFICATION_EMAIL_KEY)).toBe(
      "user@example.com",
    );
  });

  it("returns null for empty or whitespace-only storage", () => {
    localStorage.setItem(PENDING_VERIFICATION_EMAIL_KEY, "   ");
    expect(getPendingVerificationEmail()).toBeNull();
  });

  it("clearPendingVerificationEmail removes the key", () => {
    setPendingVerificationEmail("a@b.co");
    clearPendingVerificationEmail();
    expect(getPendingVerificationEmail()).toBeNull();
  });
});
