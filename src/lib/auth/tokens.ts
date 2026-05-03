/** Mirrors backend naming; used by axios interceptors and AuthProvider. */
export const ACCESS_TOKEN_KEY = "access_token";
export const REFRESH_TOKEN_KEY = "refresh_token";

export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  } catch {
    return null;
  }
}

export function getRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setTokens(access: string | null, refresh: string | null): void {
  if (typeof window === "undefined") return;
  try {
    if (access) localStorage.setItem(ACCESS_TOKEN_KEY, access);
    else localStorage.removeItem(ACCESS_TOKEN_KEY);
    if (refresh) localStorage.setItem(REFRESH_TOKEN_KEY, refresh);
    else localStorage.removeItem(REFRESH_TOKEN_KEY);
  } catch {
    /* ignore */
  }
}

export function clearTokens(): void {
  setTokens(null, null);
}

function pickToken(obj: Record<string, unknown>, keys: string[]): string | null {
  for (const k of keys) {
    const v = obj[k];
    if (typeof v === "string" && v.length > 0) return v;
  }
  const nested = obj.data;
  if (nested && typeof nested === "object") {
    const n = nested as Record<string, unknown>;
    for (const k of keys) {
      const v = n[k];
      if (typeof v === "string" && v.length > 0) return v;
    }
  }
  return null;
}

/** Supports common API shapes for login / verify / refresh responses. */
export function persistTokensFromResponse(data: unknown): void {
  if (!data || typeof data !== "object") return;
  const d = data as Record<string, unknown>;
  const accessNew = pickToken(d, ["accessToken", "access_token", "token", "access"]);
  const refreshNew = pickToken(d, ["refreshToken", "refresh_token", "refresh"]);
  if (!accessNew && !refreshNew) return;
  const access = accessNew ?? getAccessToken();
  const refresh = refreshNew ?? getRefreshToken();
  if (access) setTokens(access, refresh);
}
