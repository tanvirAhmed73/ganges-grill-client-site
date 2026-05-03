"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
  type OrderStatus,
  apiGetMyOrders,
} from "@/lib/api/restaurant-owner-api";
import { getApiErrorMessage } from "@/lib/api/api-error";
import { formatOrderStatus } from "@/lib/vendor/order-transitions";
import { MdChevronRight } from "react-icons/md";

const STATUS_OPTIONS: (OrderStatus | "all")[] = [
  "all",
  "pending_acceptance",
  "accepted",
  "preparing",
  "ready_for_pickup",
  "out_for_delivery",
  "delivered",
  "rejected",
  "cancelled_by_customer",
  "cancelled_by_restaurant",
];

type OrderRow = {
  id: string;
  orderNumber: string;
  status: string;
  total: number;
  createdAt: string;
};

export default function VendorOrdersPage() {
  const [filter, setFilter] = useState<OrderStatus | "all">("all");
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    try {
      const { data } =
        filter === "all"
          ? await apiGetMyOrders()
          : await apiGetMyOrders({ status: filter });
      setOrders(Array.isArray(data?.orders) ? data.orders : []);
    } catch (e) {
      setError(getApiErrorMessage(e));
      setOrders([]);
    }
  }, [filter]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      await load();
      if (!cancelled) setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [load]);

  const fmtMoney = (n: number) =>
    new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(
      n ?? 0
    );

  const fmtDate = (iso: string) => {
    try {
      return new Intl.DateTimeFormat(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(iso));
    } catch {
      return iso;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-vendor-ink sm:text-3xl">
          Orders
        </h1>
        <p className="mt-1 text-sm text-vendor-muted">
          Filter by status and open an order to update fulfillment state.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="text-sm font-medium text-vendor-ink">
          <span className="mr-2 text-vendor-muted">Status</span>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as OrderStatus | "all")}
            className="mt-1 w-full min-h-11 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm sm:mt-0 sm:w-auto"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s === "all" ? "All orders" : formatOrderStatus(s)}
              </option>
            ))}
          </select>
        </label>
      </div>

      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {error}
        </div>
      ) : null}

      {loading ? (
        <div className="space-y-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-16 animate-pulse rounded-xl bg-teal-100/40" />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-vendor-border bg-white px-6 py-14 text-center text-vendor-muted">
          No orders in this view.
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-vendor-border bg-white shadow-sm">
          <ul className="divide-y divide-slate-100">
            {orders.map((o) => (
              <li key={o.id}>
                <Link
                  href={`/vendor/orders/${encodeURIComponent(o.id)}`}
                  className="flex items-center gap-3 px-4 py-4 transition hover:bg-teal-50/80 sm:px-5"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-vendor-ink">{o.orderNumber}</p>
                    <p className="text-xs text-vendor-muted">{fmtDate(o.createdAt)}</p>
                  </div>
                  <span className="hidden shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 sm:inline">
                    {formatOrderStatus(o.status)}
                  </span>
                  <span className="shrink-0 font-semibold tabular-nums text-vendor-primary">
                    {fmtMoney(o.total)}
                  </span>
                  <MdChevronRight className="shrink-0 text-vendor-muted" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
