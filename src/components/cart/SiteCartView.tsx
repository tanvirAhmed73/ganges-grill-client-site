"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useCart from "@/hooks/useCart";
import { useAuthModal } from "@/contexts/auth-modal-context";
import { removeDemoCartLine } from "@/lib/cart/demo-cart-storage";

type CartRow = {
  _id: string;
  foodId?: string;
  name: string;
  image: string;
  price: number;
};

export default function SiteCartView() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const router = useRouter();
  const { openAuthModal } = useAuthModal();
  const [cart, refetch] = useCart();

  const rows = (cart ?? []) as CartRow[];
  const total = rows.reduce((s, r) => s + (Number(r.price) || 0), 0);
  const fmt = (n: number) =>
    new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(
      n
    );

  const removeItem = (id: string, name: string) => {
    Swal.fire({
      title: "Remove item?",
      text: name,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF6B35",
      cancelButtonColor: "#94a3b8",
      confirmButtonText: "Remove",
    }).then((result) => {
      if (!result.isConfirmed || !user?.email) return;

      if (id.startsWith("demo-line-")) {
        removeDemoCartLine(user.email, id);
        refetch();
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Removed",
          showConfirmButton: false,
          timer: 1200,
        });
        return;
      }

      axiosSecure.delete(`/cart/${id}`).then((res) => {
        if (res.data?.deletedCount !== undefined) {
          refetch();
          Swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: "Removed",
            showConfirmButton: false,
            timer: 1200,
          });
        }
      });
    });
  };

  if (!user?.email) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-brand-dark">Your cart</h1>
        <p className="mt-3 text-sm leading-relaxed text-brand-muted">
          Sign in to see your cart and checkout.
        </p>
        <button
          type="button"
          onClick={() => openAuthModal("login", "/cart")}
          className="mt-8 inline-flex min-h-12 items-center justify-center rounded-xl bg-brand-primary px-8 py-3 text-sm font-semibold text-white shadow-md hover:bg-brand-primary/90"
        >
          Log in
        </button>
        <p className="mt-6 text-sm text-brand-muted">
          <Link href="/order/popular" className="font-semibold text-brand-primary hover:underline">
            Continue browsing
          </Link>
        </p>
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-brand-dark">Your cart is empty</h1>
        <p className="mt-3 text-sm text-brand-muted">
          Add dishes from the menu — they’ll show up here.
        </p>
        <Link
          href="/order/popular"
          className="mt-8 inline-flex min-h-12 items-center justify-center rounded-xl bg-brand-primary px-8 py-3 text-sm font-semibold text-white shadow-md hover:bg-brand-primary/90"
        >
          Browse menu
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-brand-dark sm:text-3xl">
            Your cart
          </h1>
          <p className="mt-1 text-sm text-brand-muted">
            {rows.length} {rows.length === 1 ? "item" : "items"}
          </p>
        </div>
        <Link
          href="/order/popular"
          className="text-sm font-semibold text-brand-primary hover:underline"
        >
          Add more food
        </Link>
      </div>

      <ul className="divide-y divide-black/[0.06] rounded-2xl border border-black/[0.06] bg-white shadow-sm ring-1 ring-black/[0.03]">
        {rows.map((item) => {
          const menuId = item.foodId ?? item._id;
          return (
          <li
            key={item._id}
            className="flex gap-4 p-4 first:rounded-t-2xl last:rounded-b-2xl sm:gap-6 sm:p-5"
          >
            <Link
              href={`/menu/item/${encodeURIComponent(menuId)}`}
              className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-brand-secondary/30 sm:h-28 sm:w-28"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.image} alt="" className="h-full w-full object-cover" />
            </Link>
            <div className="flex min-w-0 flex-1 flex-col justify-center sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <div className="min-w-0">
                <Link
                  href={`/menu/item/${encodeURIComponent(menuId)}`}
                  className="font-semibold text-brand-dark hover:text-brand-primary"
                >
                  {item.name}
                </Link>
                <p className="mt-1 text-sm font-semibold text-brand-primary">
                  {fmt(Number(item.price))}
                </p>
              </div>
              <button
                type="button"
                onClick={() => removeItem(item._id, item.name)}
                className="mt-3 self-start rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-50 sm:mt-0 sm:self-center"
              >
                Remove
              </button>
            </div>
          </li>
        );
        })}
      </ul>

      <div className="mt-8 rounded-2xl border border-black/[0.06] bg-white p-6 shadow-sm ring-1 ring-black/[0.03]">
        <div className="flex items-center justify-between text-brand-dark">
          <span className="text-sm font-medium text-brand-muted">Subtotal</span>
          <span className="text-xl font-bold tabular-nums">{fmt(total)}</span>
        </div>
        <p className="mt-2 text-xs text-brand-muted">
          Taxes and delivery calculated at checkout.
        </p>
        <button
          type="button"
          onClick={() => router.push("/checkout")}
          className="mt-6 w-full min-h-12 rounded-xl bg-brand-primary py-3.5 text-center text-base font-semibold text-white shadow-md shadow-brand-primary/25 hover:bg-brand-primary/90"
        >
          Proceed to checkout
        </button>
      </div>
    </div>
  );
}
