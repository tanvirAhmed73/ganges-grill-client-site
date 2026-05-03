"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
  type OrderStatus,
  apiGetMyOrderById,
  apiPatchOrderStatus,
} from "@/lib/api/restaurant-owner-api";
import { getApiErrorMessage } from "@/lib/api/api-error";
import {
  formatOrderStatus,
  nextStatusesFor,
} from "@/lib/vendor/order-transitions";
import { MdArrowBack } from "react-icons/md";

type OrderDetail = {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
  deliveryAddressLine1: string | null;
  deliveryCity: string | null;
  deliveryPhone: string | null;
  customerNotes: string | null;
  customer: { id: string; name: string; email: string };
  items: Array<{
    id: string;
    productName: string;
    unitPrice: number;
    quantity: number;
    lineTotal: number;
  }>;
  createdAt: string;
};

export default function VendorOrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = typeof params?.id === "string" ? params.id : "";

  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [pending, setPending] = useState<OrderStatus | null>(null);

  const load = useCallback(async () => {
    if (!id) return;
    setError(null);
    try {
      const { data } = await apiGetMyOrderById(id);
      setOrder(data?.order ?? null);
    } catch (e) {
      setError(getApiErrorMessage(e));
      setOrder(null);
    }
  }, [id]);

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

  const advance = async (next: OrderStatus) => {
    if (!id) return;
    setActionError(null);
    setPending(next);
    try {
      const { data } = await apiPatchOrderStatus(id, next);
      setOrder(data?.order ?? null);
    } catch (e) {
      setActionError(getApiErrorMessage(e));
    } finally {
      setPending(null);
    }
  };

  if (!id) {
    return (
      <p className="text-sm text-red-600">Invalid order.</p>
    );
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-10 w-40 animate-pulse rounded-lg bg-teal-100/50" />
        <div className="h-64 animate-pulse rounded-2xl bg-teal-100/30" />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="space-y-4">
        <button
          type="button"
          onClick={() => router.push("/vendor/orders")}
          className="inline-flex items-center gap-1 text-sm font-semibold text-vendor-primary hover:underline"
        >
          <MdArrowBack aria-hidden />
          Back to orders
        </button>
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {error ?? "Order not found."}
        </div>
      </div>
    );
  }

  const nextOptions = nextStatusesFor(order.status);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={() => router.push("/vendor/orders")}
          className="inline-flex w-fit items-center gap-1 text-sm font-semibold text-vendor-primary hover:underline"
        >
          <MdArrowBack aria-hidden />
          Orders
        </button>
      </div>

      <div className="rounded-2xl border border-vendor-border bg-white p-5 shadow-sm sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-vendor-ink sm:text-2xl">
              {order.orderNumber}
            </h1>
            <p className="mt-1 text-sm text-vendor-muted">
              {formatOrderStatus(order.status)}
            </p>
          </div>
          <p className="text-lg font-bold tabular-nums text-vendor-primary">
            {fmtMoney(order.total)}
          </p>
        </div>

        <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-vendor-muted">Customer</dt>
            <dd className="font-medium text-vendor-ink">{order.customer?.name}</dd>
            <dd className="text-vendor-muted">{order.customer?.email}</dd>
          </div>
          <div>
            <dt className="text-vendor-muted">Delivery phone</dt>
            <dd className="font-medium text-vendor-ink">
              {order.deliveryPhone ?? "—"}
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-vendor-muted">Address</dt>
            <dd className="font-medium text-vendor-ink">
              {[order.deliveryAddressLine1, order.deliveryCity]
                .filter(Boolean)
                .join(", ") || "—"}
            </dd>
          </div>
          {order.customerNotes ? (
            <div className="sm:col-span-2">
              <dt className="text-vendor-muted">Customer notes</dt>
              <dd className="text-vendor-ink">{order.customerNotes}</dd>
            </div>
          ) : null}
        </dl>

        <div className="mt-6 border-t border-slate-100 pt-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-vendor-muted">
            Items
          </h2>
          <ul className="mt-3 divide-y divide-slate-100">
            {order.items?.map((line) => (
              <li
                key={line.id}
                className="flex flex-wrap items-baseline justify-between gap-2 py-3 text-sm"
              >
                <span className="font-medium text-vendor-ink">
                  {line.productName}{" "}
                  <span className="font-normal text-vendor-muted">
                    × {line.quantity}
                  </span>
                </span>
                <span className="tabular-nums text-vendor-ink">
                  {fmtMoney(line.lineTotal)}
                </span>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-1 text-sm">
            <div className="flex justify-between">
              <dt className="text-vendor-muted">Subtotal</dt>
              <dd className="tabular-nums">{fmtMoney(order.subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-vendor-muted">Delivery</dt>
              <dd className="tabular-nums">{fmtMoney(order.deliveryFee)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-vendor-muted">Tax</dt>
              <dd className="tabular-nums">{fmtMoney(order.tax)}</dd>
            </div>
          </dl>
        </div>

        {actionError ? (
          <p className="mt-4 text-sm text-red-600" role="alert">
            {actionError}
          </p>
        ) : null}

        {nextOptions.length > 0 ? (
          <div className="mt-8 flex flex-wrap gap-2">
            <span className="w-full text-sm font-medium text-vendor-muted">
              Update status
            </span>
            {nextOptions.map((s) => (
              <button
                key={s}
                type="button"
                disabled={pending !== null}
                onClick={() => advance(s)}
                className={
                  s === "rejected" || s === "cancelled_by_restaurant"
                    ? "rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-700 hover:bg-red-50 disabled:opacity-60"
                    : "rounded-xl bg-vendor-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-800 disabled:opacity-60"
                }
              >
                {pending === s ? "…" : formatOrderStatus(s)}
              </button>
            ))}
          </div>
        ) : (
          <p className="mt-6 text-sm text-vendor-muted">
            No further vendor actions for this order state.
          </p>
        )}

        <p className="mt-8 text-center text-sm">
          <Link href="/vendor/orders" className="font-semibold text-vendor-primary hover:underline">
            View all orders
          </Link>
        </p>
      </div>
    </div>
  );
}
