"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { axiosSecure } from "@/lib/api/axios-secure";
import useAuth from "@/hooks/useAuth";

/**
 * Registers JWT request/response interceptors once per app mount.
 * Must render inside AuthProvider.
 */
export default function AxiosSecureSetup() {
  const router = useRouter();
  const { logOut } = useAuth();

  useEffect(() => {
    const reqId = axiosSecure.interceptors.request.use(
      (config) => {
        const token =
          typeof window !== "undefined"
            ? localStorage.getItem("access_token")
            : null;
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
        if (status === 401 || status === 403) {
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
