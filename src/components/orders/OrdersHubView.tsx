"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MdChevronRight, MdReceiptLong } from "react-icons/md";
import type { OrderConfirmationPayload } from "@/lib/orders/confirmation-storage";
import { loadOrderConfirmation } from "@/lib/orders/confirmation-storage";

export default function OrdersHubView() {
  const [last, setLast] = useState<OrderConfirmationPayload | null>(null);

  useEffect(() => {
    setLast(loadOrderConfirmation());
  }, []);

  const fmt = (n: number) =>
    new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(n);

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:py-14">
      <h1 className="text-2xl font-bold tracking-tight text-brand-dark sm:text-3xl">
        My orders
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-brand-muted">
        Track deliveries and reorder favourites — full history will sync when your account is
        connected to the live order API.
      </p>

      {last ? (
        <section className="mt-8 rounded-2xl border border-black/[0.07] bg-white p-5 shadow-md ring-1 ring-black/[0.04]">
          <p className="text-xs font-bold uppercase tracking-wide text-brand-muted">Latest order</p>
          <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
            <div className="flex min-w-0 gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-primary/12 text-brand-primary">
                <MdReceiptLong className="text-xl" aria-hidden />
              </div>
              <div className="min-w-0">
                <p className="font-mono font-bold tabular-nums text-brand-dark">{last.orderNumber}</p>
                <p className="mt-0.5 text-sm text-brand-muted">
                  Total {fmt(last.total)} ·{" "}
                  {new Date(last.placedAt).toLocaleString(undefined, {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
              </div>
            </div>
            <Link
              href="/checkout/success"
              className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-brand-primary hover:underline"
            >
              View details
              <MdChevronRight className="text-lg" aria-hidden />
            </Link>
          </div>
        </section>
      ) : (
        <div className="mt-10 rounded-2xl border border-dashed border-black/15 bg-white/80 px-6 py-14 text-center">
          <p className="font-medium text-brand-dark">No orders yet</p>
          <p className="mt-2 text-sm text-brand-muted">
            When you complete checkout, your order summary will show up here.
          </p>
          <Link
            href="/order/popular"
            className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl bg-brand-primary px-8 py-2.5 text-sm font-semibold text-white shadow-md"
          >
            Start ordering
          </Link>
        </div>
      )}

      <p className="mt-10 text-center text-xs text-brand-muted">
        Live tracking and push notifications require a connected backend.
      </p>
    </div>
  );
}
