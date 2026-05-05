import { axiosPublic } from "../api/axios-public";
import {
  getAccessToken,
  getRefreshToken,
  persistTokensFromResponse,
  clearTokens,
} from "./tokens";

let inFlight: Promise<boolean> | null = null;

/** Rotates tokens via `POST /auth/refresh`. Safe to call concurrently. */
export function refreshAccessToken(): Promise<boolean> {
  if (inFlight) return inFlight;
  inFlight = (async () => {
    try {
      const rt = getRefreshToken();
      if (!rt) return false;
      const { data } = await axiosPublic.post("/auth/refresh", {
        refreshToken: rt,
      });
      persistTokensFromResponse(data);
      return !!getAccessToken();
    } catch {
      clearTokens();
      return false;
    } finally {
      inFlight = null;
    }
  })();
  return inFlight;
}

/** Clears the in-flight mutex (e.g. Jest cases that run refresh back-to-back). */
export function resetRefreshAccessInFlight(): void {
  inFlight = null;
}
