/**
 * Restaurant owner API (`docs` / Frontend API reference).
 * All routes require Bearer access token + role `restaurant_owner`.
 */

import { axiosSecure } from "@/lib/api/axios-secure";

export type OrderStatus =
  | "pending_acceptance"
  | "accepted"
  | "preparing"
  | "ready_for_pickup"
  | "out_for_delivery"
  | "delivered"
  | "cancelled_by_customer"
  | "cancelled_by_restaurant"
  | "rejected";

export function apiGetMyRestaurant() {
  return axiosSecure.get("/restaurant-owner/me/restaurant");
}

export function apiPatchMyRestaurant(body: Record<string, unknown>) {
  return axiosSecure.patch("/restaurant-owner/me/restaurant", body);
}

export function apiGetMyProducts() {
  return axiosSecure.get("/restaurant-owner/me/products");
}

export function apiCreateProduct(body: Record<string, unknown>) {
  return axiosSecure.post("/restaurant-owner/me/products", body);
}

export function apiPatchProduct(id: string, body: Record<string, unknown>) {
  return axiosSecure.patch(
    `/restaurant-owner/me/products/${encodeURIComponent(id)}`,
    body
  );
}

export function apiDeleteProduct(id: string) {
  return axiosSecure.delete(
    `/restaurant-owner/me/products/${encodeURIComponent(id)}`
  );
}

export function apiGetMyOrders(params?: { status?: OrderStatus }) {
  const search = params?.status
    ? `?status=${encodeURIComponent(params.status)}`
    : "";
  return axiosSecure.get(`/restaurant-owner/me/orders${search}`);
}

export function apiGetMyOrderById(id: string) {
  return axiosSecure.get(
    `/restaurant-owner/me/orders/${encodeURIComponent(id)}`
  );
}

export function apiPatchOrderStatus(id: string, status: OrderStatus) {
  return axiosSecure.patch(
    `/restaurant-owner/me/orders/${encodeURIComponent(id)}/status`,
    { status }
  );
}
