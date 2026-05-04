"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  MdCheck,
  MdChevronRight,
  MdHome,
  MdLocalFireDepartment,
  MdOutlineDeliveryDining,
  MdOutlineRestaurant,
  MdReceiptLong,
} from "react-icons/md";
import type { OrderConfirmationPayload } from "@/lib/orders/confirmation-storage";
import { loadOrderConfirmation } from "@/lib/orders/confirmation-storage";

const STEPS = [
  { key: "received", label: "Order received", Icon: MdReceiptLong },
  { key: "prep", label: "Preparing", Icon: MdOutlineRestaurant },
  { key: "way", label: "On the way", Icon: MdOutlineDeliveryDining },
  { key: "done", label: "Delivered", Icon: MdHome },
] as const;

export default function OrderConfirmationView() {
  const [order, setOrder] = useState<OrderConfirmationPayload | null | undefined>(undefined);

  useEffect(() => {
    setOrder(loadOrderConfirmation());
  }, []);

  const fmt = (n: number) =>
    new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(n);

  if (order === undefined) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-brand-secondary border-t-brand-primary" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <h1 className="text-xl font-bold text-brand-dark">No order to show</h1>
        <p className="mt-3 text-sm text-brand-muted">
          Place an order from checkout to see your confirmation here.
        </p>
        <Link
          href="/order/popular"
          className="mt-8 inline-flex min-h-11 items-center justify-center rounded-xl bg-brand-primary px-8 py-2.5 text-sm font-semibold text-white"
        >
          Browse menu
        </Link>
      </div>
    );
  }

  const etaLabel =
    order.etaMin === order.etaMax
      ? `~${order.etaMin} min`
      : `${order.etaMin}–${order.etaMax} min`;

  return (
    <div className="bg-brand-background pb-20 pt-6 sm:pt-10">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        {/* Success header */}
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 ring-4 ring-emerald-500/10">
            <MdCheck className="h-9 w-9" strokeWidth={2.5} aria-hidden />
          </div>
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-brand-primary">
            Order placed
          </p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-brand-dark sm:text-3xl">
            Thanks — we&apos;re on it
          </h1>
          <p className="mt-2 text-sm text-brand-muted">
            You&apos;ll get updates as the restaurant prepares your food.
          </p>
        </div>

        {/* Order # + ETA — Foodpanda-style prominent chips */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-4">
          <div className="rounded-2xl border border-black/[0.08] bg-white px-5 py-4 text-center shadow-sm ring-1 ring-black/[0.04] sm:text-left">
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-muted">
              Order number
            </p>
            <p className="mt-1 font-mono text-lg font-bold tabular-nums text-brand-dark sm:text-xl">
              {order.orderNumber}
            </p>
          </div>
          <div className="rounded-2xl border border-brand-primary/25 bg-gradient-to-br from-brand-primary/10 to-brand-secondary/30 px-5 py-4 text-center shadow-sm sm:text-left">
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-dark/80">
              Estimated arrival
            </p>
            <p className="mt-1 flex items-center justify-center gap-1.5 text-lg font-bold text-brand-primary sm:justify-start">
              <MdLocalFireDepartment className="shrink-0 text-xl" aria-hidden />
              {etaLabel}
            </p>
          </div>
        </div>

        {/* Status tracker — horizontal like Foodpanda + progress bar */}
        <section className="mt-10 rounded-3xl border border-black/[0.06] bg-white p-5 shadow-md ring-1 ring-black/[0.04] sm:p-7">
          <h2 className="text-sm font-bold uppercase tracking-wide text-brand-muted">
            Order status
          </h2>
          <p className="mt-1 text-sm text-brand-muted">
            We&apos;ve sent your order to the restaurant. You&apos;ll see the next steps update here
            when the API is connected.
          </p>
          <div className="mt-6 grid grid-cols-4 gap-1.5 sm:gap-2">
            {STEPS.map((step, i) => {
              const done = i === 0;
              const Icon = step.Icon;
              return (
                <div key={step.key} className="text-center">
                  <div
                    className={`mx-auto flex h-10 w-10 items-center justify-center rounded-full sm:h-11 sm:w-11 ${
                      done
                        ? "bg-brand-primary text-white shadow-md shadow-brand-primary/25"
                        : "bg-brand-background text-brand-muted ring-1 ring-black/[0.1]"
                    }`}
                  >
                    <Icon className="text-lg sm:text-xl" aria-hidden />
                  </div>
                  <p
                    className={`mt-2 line-clamp-2 text-[10px] font-semibold leading-tight sm:text-xs ${
                      done ? "text-brand-dark" : "text-brand-muted"
                    }`}
                  >
                    {step.label}
                  </p>
                </div>
              );
            })}
          </div>
          <div
            className="mt-4 h-2 overflow-hidden rounded-full bg-black/[0.06]"
            role="progressbar"
            aria-valuenow={25}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Order progress"
          >
            <div className="h-full w-1/4 rounded-full bg-gradient-to-r from-brand-primary to-orange-500 transition-all" />
          </div>
        </section>

        {/* Delivery + payment summary */}
        <section className="mt-6 rounded-3xl border border-black/[0.06] bg-white p-5 shadow-sm ring-1 ring-black/[0.03] sm:p-7">
          <h2 className="text-base font-bold text-brand-dark">Delivery</h2>
          <p className="mt-3 text-sm leading-relaxed text-brand-muted">
            {order.addressLine}, {order.city}
          </p>
          <p className="mt-2 text-sm font-medium text-brand-dark">{order.phone}</p>
          {order.notes.trim() ? (
            <p className="mt-3 rounded-xl bg-brand-background px-3 py-2 text-sm text-brand-muted">
              <span className="font-semibold text-brand-dark">Note: </span>
              {order.notes}
            </p>
          ) : null}

          <div className="mt-6 border-t border-black/[0.06] pt-6">
            <div className="flex justify-between text-sm">
              <span className="text-brand-muted">Payment</span>
              <span className="font-semibold capitalize text-brand-dark">
                {order.payment === "cash" ? "Cash on delivery" : "Card at door"}
              </span>
            </div>
            <div className="mt-3 flex justify-between text-base font-bold text-brand-dark">
              <span>Total paid</span>
              <span className="tabular-nums text-brand-primary">{fmt(order.total)}</span>
            </div>
          </div>

          <details className="group mt-6 border-t border-black/[0.06] pt-4">
            <summary className="cursor-pointer list-none text-sm font-semibold text-brand-primary [&::-webkit-details-marker]:hidden">
              <span className="inline-flex items-center gap-1">
                Order items ({order.items.length})
                <MdChevronRight className="transition group-open:rotate-90" aria-hidden />
              </span>
            </summary>
            <ul className="mt-3 space-y-2 text-sm">
              {order.items.map((item) => (
                <li key={item._id} className="flex justify-between gap-2 text-brand-dark">
                  <span className="min-w-0 truncate">{item.name}</span>
                  <span className="shrink-0 tabular-nums text-brand-muted">
                    {fmt(Number(item.price))}
                  </span>
                </li>
              ))}
            </ul>
          </details>
        </section>

        {/* CTAs — typical food-app pattern */}
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/orders"
            className="inline-flex min-h-12 flex-1 items-center justify-center rounded-xl border-2 border-brand-dark/12 bg-white px-6 py-3 text-center text-sm font-semibold text-brand-dark shadow-sm hover:border-brand-primary/40 sm:flex-initial sm:min-w-[11rem]"
          >
            View my orders
          </Link>
          <Link
            href="/order/popular"
            className="inline-flex min-h-12 flex-1 items-center justify-center rounded-xl bg-brand-primary px-6 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-brand-primary/25 hover:bg-brand-primary/90 sm:flex-initial sm:min-w-[11rem]"
          >
            Order more food
          </Link>
        </div>

        <p className="mt-8 text-center text-xs text-brand-muted">
          Demo flow — connect your backend to send real SMS/push and live rider tracking.
        </p>
      </div>
    </div>
  );
}
