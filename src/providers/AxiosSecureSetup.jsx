"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { axiosSecure } from "@/lib/api/axios-secure";
import { refreshAccessToken } from "@/lib/auth/refresh-access";
import { getAccessToken } from "@/lib/auth/tokens";
import useAuth from "@/hooks/useAuth";

const SKIP_REFRESH_PATHS = [
  "/auth/login",
  "/auth/register",
  "/auth/verify-email",
  "/auth/resend-verification",
  "/auth/refresh",
];

function shouldSkipRefresh(url) {
  return SKIP_REFRESH_PATHS.some((p) => url.includes(p));
}

/**
 * Attaches Bearer token and retries once after `/auth/refresh` on 401.
 */
export default function AxiosSecureSetup() {
  const router = useRouter();
  const { logOut } = useAuth();

  useEffect(() => {
    const reqId = axiosSecure.interceptors.request.use(
      (config) => {
        const token =
          typeof window !== "undefined" ? getAccessToken() : null;
        if (token) {
          config.headers.authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const resId = axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        const status = error.response?.status;
        const config = error.config;
        if (!config) return Promise.reject(error);

        const url = String(config.url ?? "");

        if (
          status === 401 &&
          !config._retry &&
          !shouldSkipRefresh(url)
        ) {
          config._retry = true;
          const ok = await refreshAccessToken();
          if (ok) {
            const token = getAccessToken();
            if (token) {
              config.headers.authorization = `Bearer ${token}`;
              return axiosSecure(config);
            }
          }
        }

        if (
          (status === 401 || status === 403) &&
          !url.includes("/auth/refresh")
        ) {
          await logOut();
          router.push("/login");
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(reqId);
      axiosSecure.interceptors.response.eject(resId);
    };
  }, [router, logOut]);

  return null;
}
