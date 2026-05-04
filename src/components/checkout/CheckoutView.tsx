"use client";

import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { clearDemoCart } from "@/lib/cart/demo-cart-storage";
import { useDeliveryAddress } from "@/contexts/delivery-address-context";
import useAuth from "@/hooks/useAuth";
import useCart from "@/hooks/useCart";
import { useAuthModal } from "@/contexts/auth-modal-context";
import {
  generateOrderNumber,
  saveOrderConfirmation,
} from "@/lib/orders/confirmation-storage";

export default function CheckoutView() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const router = useRouter();
  const { openAuthModal } = useAuthModal();
  const { saved: deliverySaved, openAddressPicker } = useDeliveryAddress();
  const [cart] = useCart();
  const rows = cart ?? [];
  const total = rows.reduce(
    (s: number, r: { price?: number }) => s + (Number(r.price) || 0),
    0
  );

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [payment, setPayment] = useState<"cash" | "card">("cash");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (!deliverySaved) return;
    setAddress((a) => a.trim() || deliverySaved.detail);
    setCity((c) => c.trim() || deliverySaved.area);
  }, [deliverySaved]);

  const fmt = (n: number) =>
    new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(
      n
    );

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!address.trim() || !city.trim() || !phone.trim()) {
      setFormError("Please fill in delivery address, city, and phone.");
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 650));

    const etaMin = 28 + Math.floor(Math.random() * 8);
    const etaMax = etaMin + 8 + Math.floor(Math.random() * 12);

    saveOrderConfirmation({
      orderNumber: generateOrderNumber(),
      placedAt: new Date().toISOString(),
      etaMin,
      etaMax,
      addressLine: address.trim(),
      city: city.trim(),
      phone: phone.trim(),
      notes: notes.trim(),
      payment,
      total,
      items: rows.map((row: { _id: string; name: string; price: number }) => ({
        _id: String(row._id),
        name: row.name,
        price: Number(row.price) || 0,
      })),
    });

    clearDemoCart(user.email);
    await queryClient.invalidateQueries({ queryKey: ["cart", user.email] });

    setSubmitting(false);
    router.push("/checkout/success");
  };

  if (!user?.email) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-brand-dark">Checkout</h1>
        <p className="mt-3 text-sm text-brand-muted">Sign in to continue.</p>
        <button
          type="button"
          onClick={() => openAuthModal("login", "/checkout")}
          className="mt-8 inline-flex min-h-12 items-center justify-center rounded-xl bg-brand-primary px-8 py-3 text-sm font-semibold text-white"
        >
          Log in
        </button>
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-brand-dark">Your cart is empty</h1>
        <Link
          href="/order/popular"
          className="mt-6 inline-block font-semibold text-brand-primary hover:underline"
        >
          Back to menu
        </Link>
      </div>
    );
  }

  const inputCls =
    "mt-1 w-full rounded-xl border border-black/[0.1] bg-white px-4 py-3 text-sm text-brand-dark outline-none ring-brand-primary/0 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20";

  return (
    <div className="mx-auto max-w-5xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold tracking-tight text-brand-dark sm:text-3xl">
        Checkout
      </h1>
      <p className="mt-1 text-sm text-brand-muted">
        Delivery details and payment method — after you place your order you&apos;ll see a
        Foodpanda-style confirmation with order number and status.
      </p>

      {formError ? (
        <div
          className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"
          role="alert"
        >
          {formError}
        </div>
      ) : null}

      <div className="mt-10 grid gap-10 lg:grid-cols-5 lg:gap-12">
        <form
          id="checkout-form"
          onSubmit={onSubmit}
          className="space-y-5 lg:col-span-3"
        >
          <section className="rounded-2xl border border-black/[0.06] bg-white p-5 shadow-sm ring-1 ring-black/[0.03] sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <h2 className="text-lg font-bold text-brand-dark">Delivery</h2>
              <button
                type="button"
                onClick={() => openAddressPicker()}
                className="text-sm font-semibold text-brand-primary hover:underline"
              >
                Pick on map
              </button>
            </div>
            <div className="mt-4 space-y-4">
              <label className="block text-sm font-medium text-brand-dark">
                Address line
                <input
                  className={inputCls}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="House / road"
                  autoComplete="street-address"
                  required
                />
              </label>
              <label className="block text-sm font-medium text-brand-dark">
                City
                <input
                  className={inputCls}
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Dhaka"
                  autoComplete="address-level2"
                  required
                />
              </label>
              <label className="block text-sm font-medium text-brand-dark">
                Phone
                <input
                  className={inputCls}
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+880 …"
                  autoComplete="tel"
                  required
                />
              </label>
              <label className="block text-sm font-medium text-brand-dark">
                Notes for restaurant (optional)
                <textarea
                  className={`${inputCls} min-h-[88px] resize-y`}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Ring the bell"
                />
              </label>
            </div>
          </section>

          <section className="rounded-2xl border border-black/[0.06] bg-white p-5 shadow-sm ring-1 ring-black/[0.03] sm:p-6">
            <h2 className="text-lg font-bold text-brand-dark">Payment</h2>
            <p className="mt-1 text-xs text-brand-muted">
              Choose how you’ll pay on delivery or pickup.
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <label className="flex cursor-pointer items-center gap-3 rounded-xl border-2 border-black/[0.08] bg-brand-background px-4 py-3 has-[:checked]:border-brand-primary has-[:checked]:bg-brand-secondary/40">
                <input
                  type="radio"
                  name="pay"
                  checked={payment === "cash"}
                  onChange={() => setPayment("cash")}
                  className="text-brand-primary"
                />
                <span className="text-sm font-semibold text-brand-dark">Cash</span>
              </label>
              <label className="flex cursor-pointer items-center gap-3 rounded-xl border-2 border-black/[0.08] bg-brand-background px-4 py-3 has-[:checked]:border-brand-primary has-[:checked]:bg-brand-secondary/40">
                <input
                  type="radio"
                  name="pay"
                  checked={payment === "card"}
                  onChange={() => setPayment("card")}
                  className="text-brand-primary"
                />
                <span className="text-sm font-semibold text-brand-dark">
                  Card <span className="font-normal text-brand-muted">(at door)</span>
                </span>
              </label>
            </div>
          </section>

          <button
            type="submit"
            disabled={submitting}
            className="w-full min-h-12 rounded-xl bg-brand-primary py-3.5 text-base font-semibold text-white shadow-lg shadow-brand-primary/25 hover:bg-brand-primary/90 disabled:opacity-60 lg:hidden"
          >
            {submitting ? "Placing…" : "Place order"}
          </button>
        </form>

        <aside className="lg:col-span-2">
          <div className="sticky top-24 rounded-2xl border border-black/[0.06] bg-white p-6 shadow-md ring-1 ring-black/[0.04]">
            <h2 className="text-lg font-bold text-brand-dark">Order summary</h2>
            <ul className="mt-4 max-h-56 space-y-3 overflow-y-auto text-sm">
              {rows.map((item: { _id: string; name: string; price: number }) => (
                <li key={item._id} className="flex justify-between gap-2 text-brand-dark">
                  <span className="min-w-0 truncate">{item.name}</span>
                  <span className="shrink-0 tabular-nums text-brand-muted">
                    {fmt(Number(item.price))}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-4 border-t border-black/[0.06] pt-4">
              <div className="flex justify-between text-base font-bold text-brand-dark">
                <span>Total</span>
                <span className="tabular-nums text-brand-primary">{fmt(total)}</span>
              </div>
            </div>
            <button
              type="submit"
              form="checkout-form"
              disabled={submitting}
              className="mt-6 hidden w-full min-h-12 rounded-xl bg-brand-primary py-3.5 text-base font-semibold text-white shadow-lg shadow-brand-primary/25 hover:bg-brand-primary/90 disabled:opacity-60 lg:block"
            >
              {submitting ? "Placing…" : "Place order"}
            </button>
          </div>
        </aside>
      </div>

      <p className="mt-10 text-center text-xs text-brand-muted">
        <Link href="/cart" className="font-semibold text-brand-primary hover:underline">
          Back to cart
        </Link>
      </p>
    </div>
  );
}
