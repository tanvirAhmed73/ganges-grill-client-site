import { render, screen, waitFor } from "@testing-library/react";
import VendorRoute from "./VendorRoute";

const mockReplace = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ replace: mockReplace }),
}));

const mockUseAuth = jest.fn();
jest.mock("@/hooks/useAuth", () => ({
  __esModule: true,
  default: () => mockUseAuth(),
}));

describe("VendorRoute", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("redirects to login when not authenticated", async () => {
    mockUseAuth.mockReturnValue({ user: null, loading: false });
    render(
      <VendorRoute>
        <span>Vendor</span>
      </VendorRoute>,
    );

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith("/login?from=/vendor");
    });
  });

  it("redirects non-vendor users to home", async () => {
    mockUseAuth.mockReturnValue({
      user: { role: "customer" },
      loading: false,
    });
    render(
      <VendorRoute>
        <span>Vendor</span>
      </VendorRoute>,
    );

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith("/");
    });
  });

  it("renders children for restaurant_owner", () => {
    mockUseAuth.mockReturnValue({
      user: { role: "restaurant_owner" },
      loading: false,
    });
    render(
      <VendorRoute>
        <span>Vendor</span>
      </VendorRoute>,
    );
    expect(screen.getByText("Vendor")).toBeInTheDocument();
    expect(mockReplace).not.toHaveBeenCalled();
  });
});
