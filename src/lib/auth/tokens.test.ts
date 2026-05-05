import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  clearTokens,
  getAccessToken,
  getRefreshToken,
  persistTokensFromResponse,
  setTokens,
} from "./tokens";

describe("tokens", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe("getAccessToken / getRefreshToken / setTokens / clearTokens", () => {
    it("persists and reads access and refresh tokens", () => {
      setTokens("acc", "ref");
      expect(getAccessToken()).toBe("acc");
      expect(getRefreshToken()).toBe("ref");
      expect(localStorage.getItem(ACCESS_TOKEN_KEY)).toBe("acc");
      expect(localStorage.getItem(REFRESH_TOKEN_KEY)).toBe("ref");
    });

    it("clearTokens removes both keys", () => {
      setTokens("a", "r");
      clearTokens();
      expect(getAccessToken()).toBeNull();
      expect(getRefreshToken()).toBeNull();
    });
  });

  describe("persistTokensFromResponse", () => {
    it("writes tokens from flat access_token / refresh_token shape", () => {
      persistTokensFromResponse({
        access_token: "at1",
        refresh_token: "rt1",
      });
      expect(getAccessToken()).toBe("at1");
      expect(getRefreshToken()).toBe("rt1");
    });

    it("supports accessToken / refreshToken camelCase", () => {
      persistTokensFromResponse({
        accessToken: "at2",
        refreshToken: "rt2",
      });
      expect(getAccessToken()).toBe("at2");
      expect(getRefreshToken()).toBe("rt2");
    });

    it("reads nested data object", () => {
      persistTokensFromResponse({
        data: { access_token: "at3", refresh_token: "rt3" },
      });
      expect(getAccessToken()).toBe("at3");
      expect(getRefreshToken()).toBe("rt3");
    });

    it("reads nested tokens object", () => {
      persistTokensFromResponse({
        tokens: { accessToken: "at4", refreshToken: "rt4" },
      });
      expect(getAccessToken()).toBe("at4");
      expect(getRefreshToken()).toBe("rt4");
    });

    it("merges partial updates with existing tokens", () => {
      setTokens("old-a", "old-r");
      persistTokensFromResponse({ access_token: "new-a" });
      expect(getAccessToken()).toBe("new-a");
      expect(getRefreshToken()).toBe("old-r");
    });

    it("no-ops on invalid payload", () => {
      setTokens("keep", "both");
      persistTokensFromResponse(null);
      persistTokensFromResponse(undefined);
      persistTokensFromResponse({});
      persistTokensFromResponse({ foo: "bar" });
      expect(getAccessToken()).toBe("keep");
      expect(getRefreshToken()).toBe("both");
    });
  });
});
