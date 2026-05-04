/**
 * Client-only: last completed checkout payload for the confirmation screen.
 * Replace with API order id + server fetch when the backend is ready.
 */

export type OrderConfirmationItem = {
  _id: string;
  name: string;
  price: number;
};

export type OrderConfirmationPayload = {
  orderNumber: string;
  placedAt: string;
  etaMin: number;
  etaMax: number;
  addressLine: string;
  city: string;
  phone: string;
  notes: string;
  payment: "cash" | "card";
  total: number;
  items: OrderConfirmationItem[];
};

const KEY = "gg_order_confirmation_v1";

export function generateOrderNumber(): string {
  const d = new Date();
  const y = d.getFullYear().toString().slice(-2);
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `GG-${y}${m}${day}-${rand}`;
}

export function saveOrderConfirmation(payload: OrderConfirmationPayload): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(KEY, JSON.stringify(payload));
  } catch {
    // ignore quota / private mode
  }
}

export function loadOrderConfirmation(): OrderConfirmationPayload | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw) as OrderConfirmationPayload;
  } catch {
    return null;
  }
}
