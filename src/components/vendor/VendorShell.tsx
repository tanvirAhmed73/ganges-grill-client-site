"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useState } from "react";
import { MdClose, MdMenu } from "react-icons/md";
import useAuth from "@/hooks/useAuth";
import VendorSidebar from "@/components/vendor/VendorSidebar";

export default function VendorShell({ children }: { children: ReactNode }) {
  const { user, logOut } = useAuth();
  const [mobileNav, setMobileNav] = useState(false);

  const title =
    user?.displayName?.trim() ||
    user?.email?.split("@")[0]?.trim() ||
    "Restaurant";

  return (
    <div className="min-h-screen bg-vendor-surface">
      <header className="sticky top-0 z-40 flex items-center justify-between gap-3 border-b border-vendor-border bg-white px-4 py-3 shadow-sm">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-slate-200 text-vendor-ink lg:hidden"
            aria-label="Open menu"
            onClick={() => setMobileNav(true)}
          >
            <MdMenu className="text-2xl" />
          </button>
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold uppercase tracking-wide text-vendor-muted">
              Vendor portal
            </p>
            <h1 className="truncate text-lg font-bold text-vendor-ink">{title}</h1>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Link
            href="/"
            className="hidden rounded-xl px-3 py-2 text-sm font-semibold text-vendor-primary hover:bg-teal-50 sm:inline-block"
          >
            View site
          </Link>
          <button
            type="button"
            onClick={() => logOut().then(() => (window.location.href = "/"))}
            className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-vendor-ink hover:bg-slate-50"
          >
            Log out
          </button>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1600px]">
        <aside className="sticky top-[57px] hidden h-[calc(100dvh-57px)] w-64 shrink-0 overflow-y-auto border-r border-vendor-border bg-vendor-sidebar lg:block">
          <VendorSidebar />
        </aside>

        <main className="min-h-[calc(100dvh-57px)] min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${
          mobileNav ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!mobileNav}
      >
        <button
          type="button"
          className={`absolute inset-0 bg-black/50 transition-opacity ${
            mobileNav ? "opacity-100" : "opacity-0"
          }`}
          aria-label="Close menu"
          onClick={() => setMobileNav(false)}
        />
        <div
          className={`absolute left-0 top-0 flex h-full w-[min(18rem,88vw)] flex-col bg-vendor-sidebar shadow-xl transition-transform duration-200 ${
            mobileNav ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-white/10 px-3 py-3">
            <span className="font-semibold text-white">Menu</span>
            <button
              type="button"
              className="rounded-lg p-2 text-teal-100 hover:bg-white/10"
              aria-label="Close"
              onClick={() => setMobileNav(false)}
            >
              <MdClose className="text-2xl" />
            </button>
          </div>
          <VendorSidebar onNavigate={() => setMobileNav(false)} />
        </div>
      </div>
    </div>
  );
}
