import { getApiErrorMessage } from "./api-error";

describe("getApiErrorMessage", () => {
  it("prefers axios response.data.message", () => {
    expect(
      getApiErrorMessage({
        response: { data: { message: "Invalid credentials" } },
      }),
    ).toBe("Invalid credentials");
  });

  it("falls back to err.message", () => {
    expect(getApiErrorMessage({ message: "Network Error" })).toBe(
      "Network Error",
    );
  });

  it("uses fallback when nothing else matches", () => {
    expect(getApiErrorMessage({}, "Auth failed")).toBe("Auth failed");
    expect(getApiErrorMessage(null)).toBe("Something went wrong");
  });
});
