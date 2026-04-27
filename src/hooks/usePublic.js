"use client";

import { axiosPublic } from "@/lib/api/axios-public";

export default function usePublic() {
  return axiosPublic;
}
