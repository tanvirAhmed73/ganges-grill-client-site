import { render, screen, waitFor } from "@testing-library/react";
import PendingVerificationGate from "./PendingVerificationGate";
import {
  PENDING_VERIFICATION_EMAIL_KEY,
  clearPendingVerificationEmail,
} from "@/lib/auth/pending-verification";

jest.mock("@/components/auth/VerifyEmailModal", () => ({
  __esModule: true,
  default: function MockVerifyModal({
    email,
  }: {
    email: string;
    onClose: () => void;
  }) {
    return <div data-testid="verify-email-modal">{email}</div>;
  },
}));

const mockUseAuth = jest.fn();
jest.mock("@/hooks/useAuth", () => ({
  __esModule: true,
  default: () => mockUseAuth(),
}));

const mockPathname = jest.fn(() => "/");
jest.mock("next/navigation", () => ({
  usePathname: () => mockPathname(),
}));

describe("PendingVerificationGate", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    mockPathname.mockReturnValue("/");
    mockUseAuth.mockReturnValue({ user: null, loading: false });
  });

  afterEach(() => {
    clearPendingVerificationEmail();
  });

  it("shows verify modal when pending email exists and user is logged out", async () => {
    localStorage.setItem(PENDING_VERIFICATION_EMAIL_KEY, "pending@test.com");

    render(<PendingVerificationGate />);

    await waitFor(() => {
      expect(screen.getByTestId("verify-email-modal")).toHaveTextContent(
        "pending@test.com",
      );
    });
  });

  it("does not show modal when user is authenticated", () => {
    localStorage.setItem(PENDING_VERIFICATION_EMAIL_KEY, "pending@test.com");
    mockUseAuth.mockReturnValue({
      user: { id: "1", email: "pending@test.com" },
      loading: false,
    });

    render(<PendingVerificationGate />);

    expect(screen.queryByTestId("verify-email-modal")).not.toBeInTheDocument();
  });

  it("does not show modal on verify-email route", () => {
    mockPathname.mockReturnValue("/verify-email");
    localStorage.setItem(PENDING_VERIFICATION_EMAIL_KEY, "pending@test.com");

    render(<PendingVerificationGate />);

    expect(screen.queryByTestId("verify-email-modal")).not.toBeInTheDocument();
  });
});
