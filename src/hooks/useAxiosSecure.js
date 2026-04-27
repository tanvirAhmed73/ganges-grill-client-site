"use client";

import { axiosSecure } from "@/lib/api/axios-secure";

/** Returns the shared axios instance (interceptors applied in AxiosSecureSetup). */
export default function useAxiosSecure() {
  return axiosSecure;
}
