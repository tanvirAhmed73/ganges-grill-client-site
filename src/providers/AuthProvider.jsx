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

function normalizeUser(data) {
  if (!data || typeof data !== "object") return null;
  const email = data.email ?? "";
  const name = data.name ?? data.displayName ?? "";
  return {
    ...data,
    email,
    displayName: String(name || email.split("@")[0] || "User"),
    uid: data.id ?? data.sub ?? email,
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
      } finally {
        setLoading(false);
      }
    },
    [hydrateUser]
  );

  const register = useCallback(async ({ email, password, name }) => {
    await apiRegister({ email, password, name });
  }, []);

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
