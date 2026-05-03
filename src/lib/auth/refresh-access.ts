import { axiosPublic } from "@/lib/api/axios-public";
import {
  getAccessToken,
  getRefreshToken,
  persistTokensFromResponse,
  clearTokens,
} from "@/lib/auth/tokens";

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
