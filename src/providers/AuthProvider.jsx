"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  apiGetMe,
  apiLogin,
  apiLogout,
  apiLogoutAll,
  apiRegister,
  apiRegisterRestaurantOwner,
  apiResendVerification,
  apiVerifyEmail,
} from "@/lib/api/auth-api";
import { refreshAccessToken } from "@/lib/auth/refresh-access";
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  persistTokensFromResponse,
} from "@/lib/auth/tokens";

export const AuthContext = createContext(null);

/** API often wraps profile as `{ user: { ... } }` (see GET /auth/me). */
function unwrapUserPayload(data) {
  if (!data || typeof data !== "object") return null;
  if (
    Object.prototype.hasOwnProperty.call(data, "user") &&
    data.user &&
    typeof data.user === "object"
  ) {
    return data.user;
  }
  return data;
}

function normalizeUser(data) {
  const raw = unwrapUserPayload(data);
  if (!raw || typeof raw !== "object") return null;
  const email = raw.email ?? "";
  const name = raw.name ?? raw.displayName ?? "";
  return {
    ...raw,
    email,
    displayName: String(name || email.split("@")[0] || "User"),
    uid: raw.id ?? raw.sub ?? email,
    emailVerified:
      typeof raw.emailVerified === "boolean" ? raw.emailVerified : undefined,
    role: raw.role,
  };
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const hydrateUser = useCallback(async () => {
    const token = getAccessToken();
    if (!token) {
      setUser(null);
      return;
    }
    try {
      const { data } = await apiGetMe(token);
      setUser(normalizeUser(data));
    } catch {
      const ok = await refreshAccessToken();
      if (ok) {
        const t2 = getAccessToken();
        if (t2) {
          try {
            const { data } = await apiGetMe(t2);
            setUser(normalizeUser(data));
            return;
          } catch {
            /* fall through */
          }
        }
      }
      clearTokens();
      setUser(null);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      await hydrateUser();
      if (!cancelled) setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [hydrateUser]);

  const signIn = useCallback(
    async (email, password) => {
      setLoading(true);
      try {
        const { data } = await apiLogin({ email, password });
        persistTokensFromResponse(data);
        await hydrateUser();
        return normalizeUser(data);
      } finally {
        setLoading(false);
      }
    },
    [hydrateUser]
  );

  const register = useCallback(async ({ email, password, name }) => {
    await apiRegister({ email, password, name });
  }, []);

  const registerRestaurantOwner = useCallback(
    async ({
      email,
      password,
      name,
      restaurantName,
      primaryCategory,
      phone,
    }) => {
      await apiRegisterRestaurantOwner({
        email,
        password,
        name,
        restaurantName,
        ...(primaryCategory?.trim()
          ? { primaryCategory: primaryCategory.trim() }
          : {}),
        ...(phone?.trim() ? { phone: phone.trim() } : {}),
      });
    },
    []
  );

  const verifyEmail = useCallback(
    async (email, code) => {
      setLoading(true);
      try {
        const { data } = await apiVerifyEmail({ email, code });
        persistTokensFromResponse(data);
        await hydrateUser();
      } finally {
        setLoading(false);
      }
    },
    [hydrateUser]
  );

  const resendVerification = useCallback(async (email) => {
    await apiResendVerification({ email });
  }, []);

  const logOut = useCallback(async () => {
    const rt = getRefreshToken();
    try {
      if (rt) await apiLogout({ refreshToken: rt });
    } catch {
      /* ignore */
    }
    clearTokens();
    setUser(null);
  }, []);

  const logOutAll = useCallback(async () => {
    const token = getAccessToken();
    try {
      if (token) await apiLogoutAll(token);
    } catch {
      /* ignore */
    }
    clearTokens();
    setUser(null);
  }, []);

  const refreshSession = useCallback(async () => {
    await hydrateUser();
  }, [hydrateUser]);

  const authInfo = useMemo(
    () => ({
      user,
      loading,
      signIn,
      register,
      registerRestaurantOwner,
      verifyEmail,
      resendVerification,
      logOut,
      logOutAll,
      refreshSession,
    }),
    [
      user,
      loading,
      signIn,
      register,
      registerRestaurantOwner,
      verifyEmail,
      resendVerification,
      logOut,
      logOutAll,
      refreshSession,
    ]
  );

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
}
