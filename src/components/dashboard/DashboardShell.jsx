"use client";

import Link from "next/link";
import { useState } from "react";
import useAdmin from "@/hooks/useAdmin";
import useAuth from "@/hooks/useAuth";

export default function DashboardShell({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { logOut } = useAuth();
  const [isAdmin] = useAdmin();

  const adminRoutes = (
    <>
      <li>
        <Link href="/dashboard/allUser" className="block rounded-lg px-3 py-2 hover:bg-white/10">
          ALL USERS
        </Link>
      </li>
      <li>
        <Link href="/dashboard/addItem" className="block rounded-lg px-3 py-2 hover:bg-white/10">
          ADD ITEMS
        </Link>
      </li>
      <li>
        <Link
          href="/dashboard/manageMenuItem"
          className="block rounded-lg px-3 py-2 hover:bg-white/10"
        >
          MANAGE MENU
        </Link>
      </li>
      <li>
        <Link href="/" className="block rounded-lg px-3 py-2 hover:bg-white/10">
          HOME
        </Link>
      </li>
      <li>
        <Link href="/dashboard/cart" className="block rounded-lg px-3 py-2 hover:bg-white/10">
          MY CART
        </Link>
      </li>
    </>
  );

  const userRoutes = (
    <>
      <li>
        <Link href="/" className="block rounded-lg px-3 py-2 hover:bg-white/10">
          HOME
        </Link>
      </li>
      <li>
        <Link href="/dashboard/cart" className="block rounded-lg px-3 py-2 hover:bg-white/10">
          MY CART
        </Link>
      </li>
      <li>
        <Link href="/contact" className="block rounded-lg px-3 py-2 hover:bg-white/10">
          CONTACT
        </Link>
      </li>
    </>
  );

  return (
    <div className="min-h-screen bg-brand-background">
      <div className="sticky top-0 z-20 flex items-center gap-3 border-b border-black/10 bg-white px-4 py-3">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="rounded-md border border-black/10 p-2 md:hidden"
          aria-label="Open sidebar"
        >
          ☰
        </button>
        <h1 className="text-lg font-semibold text-brand-dark">Dashboard</h1>
      </div>

      <div className="mx-auto grid min-h-[calc(100vh-57px)] max-w-[1400px] md:grid-cols-[260px_minmax(0,1fr)]">
        <aside
          className={`fixed inset-y-0 left-0 z-30 w-64 bg-brand-dark p-4 text-white transition-transform md:static md:translate-x-0 ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="mb-4 flex items-center justify-between md:hidden">
            <span className="font-semibold">Menu</span>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="rounded-md border border-white/20 px-2 py-1"
              aria-label="Close sidebar"
            >
              ×
            </button>
          </div>

          <ul className="space-y-2 text-sm font-medium">{isAdmin ? adminRoutes : userRoutes}</ul>
          <button
            type="button"
            onClick={() => logOut()}
            className="mt-5 w-full rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white"
          >
            Log Out
          </button>
        </aside>

        {mobileOpen ? (
          <button
            type="button"
            className="fixed inset-0 z-20 bg-black/40 md:hidden"
            onClick={() => setMobileOpen(false)}
            aria-label="Close sidebar overlay"
          />
        ) : null}

        <div className="p-4 md:p-6">{children}</div>
      </div>
    </div>
  );
}
