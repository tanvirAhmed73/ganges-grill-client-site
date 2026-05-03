import { axiosPublic } from "@/lib/api/axios-public";

/** Request bodies align with `docs/auth-api.md`; confirm field names in OpenAPI at `/docs`. */

export async function apiRegister(body: {
  email: string;
  password: string;
  name: string;
}) {
  return axiosPublic.post("/auth/register", body);
}

/** Creates `restaurant_owner` + linked restaurant; same OTP verification flow as register. */
export async function apiRegisterRestaurantOwner(body: {
  email: string;
  password: string;
  name: string;
  restaurantName: string;
  primaryCategory?: string;
  phone?: string;
}) {
  return axiosPublic.post("/auth/register-restaurant-owner", body);
}

export async function apiVerifyEmail(body: { email: string; code: string }) {
  return axiosPublic.post("/auth/verify-email", body);
}

export async function apiResendVerification(body: { email: string }) {
  return axiosPublic.post("/auth/resend-verification", body);
}

export async function apiLogin(body: { email: string; password: string }) {
  return axiosPublic.post("/auth/login", body);
}

export async function apiRefresh(body: { refreshToken: string }) {
  return axiosPublic.post("/auth/refresh", body);
}

export async function apiLogout(body: { refreshToken: string }) {
  return axiosPublic.post("/auth/logout", body);
}

export async function apiLogoutAll(accessToken: string) {
  return axiosPublic.post(
    "/auth/logout-all",
    {},
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
}

export async function apiGetMe(accessToken: string) {
  return axiosPublic.get("/auth/me", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
}
