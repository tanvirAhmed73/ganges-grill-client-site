import { render, screen, waitFor } from "@testing-library/react";
import PrivateRoute from "./PrivateRoute";

const mockReplace = jest.fn();

jest.mock("next/navigation", () => ({
  usePathname: () => "/account",
  useRouter: () => ({ replace: mockReplace }),
}));

const mockUseAuth = jest.fn();
jest.mock("@/hooks/useAuth", () => ({
  __esModule: true,
  default: () => mockUseAuth(),
}));

describe("PrivateRoute", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows loader while auth is loading", () => {
    mockUseAuth.mockReturnValue({ user: null, loading: true });
    render(
      <PrivateRoute>
        <span>Secret</span>
      </PrivateRoute>,
    );
    expect(screen.queryByText("Secret")).not.toBeInTheDocument();
  });

  it("redirects unauthenticated users to login with return path", async () => {
    mockUseAuth.mockReturnValue({ user: null, loading: false });
    render(
      <PrivateRoute>
        <span>Secret</span>
      </PrivateRoute>,
    );

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith(
        "/login?from=%2Faccount",
      );
    });
    expect(screen.queryByText("Secret")).not.toBeInTheDocument();
  });

  it("renders children when user is present", () => {
    mockUseAuth.mockReturnValue({
      user: { id: "1", email: "a@b.co" },
      loading: false,
    });
    render(
      <PrivateRoute>
        <span>Secret</span>
      </PrivateRoute>,
    );
    expect(screen.getByText("Secret")).toBeInTheDocument();
    expect(mockReplace).not.toHaveBeenCalled();
  });
});
