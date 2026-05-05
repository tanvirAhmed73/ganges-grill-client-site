import { axiosPublic } from "../api/axios-public";
import * as tokens from "./tokens";
import { refreshAccessToken, resetRefreshAccessInFlight } from "./refresh-access";

jest.mock("../api/axios-public");

const postMock = axiosPublic.post as jest.Mock;

describe("refreshAccessToken", () => {
  beforeEach(() => {
    resetRefreshAccessInFlight();
    postMock.mockReset();
    localStorage.clear();
    tokens.setTokens(null, null);
  });

  it("returns false when there is no refresh token", async () => {
    await expect(refreshAccessToken()).resolves.toBe(false);
    expect(postMock).not.toHaveBeenCalled();
  });

  it("persists tokens and returns true on success", async () => {
    tokens.setTokens(null, "my-refresh");
    postMock.mockResolvedValue({
      data: { access_token: "new-access", refresh_token: "new-refresh" },
    });

    const result = await refreshAccessToken();
    expect(postMock).toHaveBeenCalled();
    expect(result).toBe(true);
    expect(postMock).toHaveBeenCalledWith("/auth/refresh", {
      refreshToken: "my-refresh",
    });
    expect(tokens.getAccessToken()).toBe("new-access");
    expect(tokens.getRefreshToken()).toBe("new-refresh");
  });

  it("clears tokens and returns false on failure", async () => {
    tokens.setTokens("old", "rt");
    postMock.mockRejectedValue(new Error("401"));

    await expect(refreshAccessToken()).resolves.toBe(false);
    expect(tokens.getAccessToken()).toBeNull();
    expect(tokens.getRefreshToken()).toBeNull();
  });
});
