"use client";

import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
import useAuth from "@/hooks/useAuth";
import useCart from "@/hooks/useCart";

export default function CartFloatingBar() {
  const { user } = useAuth();
  const [cart] = useCart();
  const rows = cart ?? [];
  const count = rows.length;
  const total = rows.reduce((s: number, r: { price?: number }) => s + Number(r.price || 0), 0);

  if (!user?.email || count === 0) return null;

  const fmt = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
  }).format(total);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[55] flex justify-center px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2">
      <Link
        href="/cart"
        className="pointer-events-auto flex min-h-[52px] w-full max-w-lg items-center justify-between gap-3 rounded-2xl bg-brand-dark px-4 py-3 text-white shadow-2xl shadow-black/25 ring-2 ring-white/10 transition hover:bg-brand-dark/95"
      >
        <span className="inline-flex items-center gap-2 text-sm font-semibold">
          <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-primary">
            <AiOutlineShopping className="text-lg" aria-hidden />
            <span className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-white px-1 text-[10px] font-bold text-brand-dark">
              {count > 99 ? "99+" : count}
            </span>
          </span>
          <span className="truncate">View cart</span>
        </span>
        <span className="shrink-0 text-sm font-bold tabular-nums">{fmt}</span>
      </Link>
    </div>
  );
}
