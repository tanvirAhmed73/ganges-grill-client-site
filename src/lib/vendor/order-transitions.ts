import type { OrderStatus } from "@/lib/api/restaurant-owner-api";

/** Allowed vendor transitions per API reference */
export const VENDOR_NEXT_STATUSES: Partial<Record<OrderStatus, OrderStatus[]>> = {
  pending_acceptance: ["accepted", "rejected"],
  accepted: ["preparing", "cancelled_by_restaurant"],
  preparing: ["ready_for_pickup", "cancelled_by_restaurant"],
  ready_for_pickup: ["out_for_delivery", "delivered"],
  out_for_delivery: ["delivered"],
};

export function nextStatusesFor(current: OrderStatus): OrderStatus[] {
  return VENDOR_NEXT_STATUSES[current] ?? [];
}

export function formatOrderStatus(s: string): string {
  return s.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
