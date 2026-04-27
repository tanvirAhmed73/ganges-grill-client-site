import axios from "axios";
import { API_BASE_URL } from "@/lib/constants";

/** Shared authenticated client; interceptors are attached once in AxiosSecureSetup. */
export const axiosSecure = axios.create({
  baseURL: API_BASE_URL,
});
