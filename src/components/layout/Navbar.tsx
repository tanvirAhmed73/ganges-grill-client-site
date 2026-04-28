"use client";

/**
 * Site header — two-tier “marketplace” style navigation (utility row + service tabs + search).
 * Styling uses Tailwind + brand tokens only (see tailwind.config.js).
 */

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import type { IconType } from "react-icons";
import { AiOutlineHeart, AiOutlineShopping } from "react-icons/ai";
import {
  MdClose,
  MdDeliveryDining,
  MdOutlineLocationOn,
  MdShoppingBag,
  MdStorefront,
} from "react-icons/md";
import { FaWalking } from "react-icons/fa";
import { FiChevronDown, FiMenu, FiSearch } from "react-icons/fi";
import { HiOutlineUser } from "react-icons/hi2";
import Swal from "sweetalert2";
import { useAuthModal } from "@/contexts/auth-modal-context";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import useAuth from "@/hooks/useAuth";
import useCart from "@/hooks/useCart";

const LOGO_SRC =
  "https://png.pngtree.com/png-clipart/20220903/ourmid/pngtree-chef-restaurant-logo-png-image_6136204.png";

interface ServiceTabProps {
  href: string;
  label: string;
  icon: IconType;
  active: boolean;
}

function ServiceTab({ href, label, icon: Icon, active }: ServiceTabProps) {
  return (
    <Link
      href={href}
      className={`flex min-h-[44px] shrink-0 touch-manipulation items-center gap-2 whitespace-nowrap border-b-[3px] px-1 py-2 text-xs font-semibold transition-colors sm:text-sm md:gap-2.5 md:text-[0.9375rem] ${
        active
          ? "border-brand-primary text-brand-dark"
          : "border-transparent text-brand-muted hover:border-brand-secondary hover:text-brand-dark"
      }`}
      aria-current={active ? "page" : undefined}
    >
      <Icon
        className={`shrink-0 text-lg md:text-xl ${active ? "text-brand-primary" : "text-brand-muted"}`}
        aria-hidden
      />
      <span>{label}</span>
    </Link>
  );
}

export default function Navbar() {
  const { user, logOut } = useAuth();
  const { openAuthModal } = useAuthModal();
  const [cart] = useCart();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const isPickup = searchParams.get("service") === "pickup";
  const isMarketplaceHome = pathname === "/" || pathname === "/home";

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const displayName =
    user?.displayName?.trim() ||
    user?.email?.split("@")[0]?.trim() ||
    "Account";

  const handleLogout = () => {
    logOut()
      .then(() => {
        router.push("/");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Signed out successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch(() => {});
    setMobileOpen(false);
  };

  const submitSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = searchQuery.trim();
    const target = q ? `/ourMenu?q=${encodeURIComponent(q)}` : "/ourMenu";
    router.push(target);
    setMobileOpen(false);
  };

  const cartCount = cart?.length ?? 0;

  return (
    <>
      <header className="sticky top-0 z-[60] border-b border-black/[0.06] bg-brand-background pt-[env(safe-area-inset-top,0px)] shadow-sm">
        {/* —— Row 1: logo, address, utilities —— */}
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-2 px-3 py-2.5 sm:gap-3 sm:px-4 sm:py-3 md:flex-nowrap md:gap-4 md:py-3.5">
          <div className="flex min-w-0 flex-[1_1_auto] items-center gap-2 md:gap-4 lg:flex-[0_1_auto]">
            <button
              type="button"
              data-mobile-nav-trigger
              className="-ml-1 inline-flex h-10 w-10 items-center justify-center rounded-lg text-brand-dark hover:bg-brand-secondary/40 lg:hidden"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-panel"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
            >
              <FiMenu className="text-xl" />
            </button>

            <Link
              href="/"
              className="flex shrink-0 items-center gap-2 rounded-md outline-none ring-brand-primary ring-offset-2 ring-offset-brand-background focus-visible:ring-2"
            >
              <img
                src={LOGO_SRC}
                alt=""
                className="h-9 w-auto object-contain sm:h-10"
              />
              <span className="hidden font-bold tracking-tight text-brand-dark sm:inline sm:text-lg">
                Ganges <span className="text-brand-primary">Grill</span>
              </span>
            </Link>

            <button
              type="button"
              className="mx-auto hidden min-w-0 max-w-md flex-1 items-start gap-2 rounded-lg px-3 py-2 text-left transition-colors hover:bg-brand-secondary/35 md:flex lg:mx-0 lg:max-w-xl"
              aria-haspopup="dialog"
              aria-label="Choose delivery address"
            >
              <MdOutlineLocationOn
                className="mt-0.5 shrink-0 text-xl text-brand-primary"
                aria-hidden
              />
              <span className="text-sm leading-tight">
                <span className="font-semibold text-brand-dark">
                  New address
                </span>
                <span className="text-brand-muted">
                  {" "}
                  · Select your address
                </span>
              </span>
            </button>
          </div>

          {/* Mobile: compact address teaser */}
          <button
            type="button"
            className="-mt-0.5 flex w-full min-w-0 items-center gap-2 rounded-lg px-1 py-2 text-left touch-manipulation md:hidden"
          >
            <MdOutlineLocationOn className="shrink-0 text-brand-primary" />
            <span className="truncate text-xs text-brand-muted">
              Select your address
            </span>
          </button>

          {/* Utility cluster */}
          <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-2 md:gap-3">
            {user ? (
              <>
                <details className="group relative hidden sm:block">
                  <summary className="flex cursor-pointer list-none items-center gap-1 rounded-lg px-2 py-2 text-sm font-semibold text-brand-dark outline-none hover:bg-brand-secondary/40 [&::-webkit-details-marker]:hidden">
                    <HiOutlineUser className="text-xl text-brand-muted" />
                    <span className="max-w-[120px] truncate capitalize">
                      {displayName}
                    </span>
                    <FiChevronDown className="text-brand-muted group-open:rotate-180" />
                  </summary>
                  <div className="absolute right-0 mt-2 min-w-[200px] rounded-xl border border-black/[0.08] bg-brand-background py-2 shadow-lg ring-1 ring-black/5">
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 text-sm font-medium text-brand-dark hover:bg-brand-secondary/50"
                      onClick={() => setMobileOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/dashboard/cart"
                      className="block px-4 py-2 text-sm font-medium text-brand-dark hover:bg-brand-secondary/50"
                      onClick={() => setMobileOpen(false)}
                    >
                      My cart
                    </Link>
                    <button
                      type="button"
                      className="block w-full px-4 py-2 text-left text-sm font-medium text-brand-dark hover:bg-brand-secondary/50"
                      onClick={handleLogout}
                    >
                      Log out
                    </button>
                  </div>
                </details>

                <LanguageSwitcher className="hidden sm:block" />

                <Link
                  href="/ourMenu"
                  className="hidden rounded-full p-2 text-brand-muted transition-colors hover:bg-brand-secondary/50 hover:text-brand-primary sm:inline-flex"
                  aria-label="Favorites"
                >
                  <AiOutlineHeart className="text-2xl" />
                </Link>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => openAuthModal("login")}
                  className="inline-flex min-h-[40px] touch-manipulation items-center justify-center rounded-lg border border-brand-dark px-3 py-2 text-xs font-semibold text-brand-dark transition-colors hover:bg-brand-secondary/45 active:bg-brand-secondary/55 sm:min-h-[44px] sm:text-sm"
                >
                  Log in
                </button>
                <button
                  type="button"
                  onClick={() => openAuthModal("signup")}
                  className="hidden min-h-[40px] touch-manipulation items-center justify-center rounded-lg bg-brand-primary px-3 py-2 text-xs font-semibold text-white shadow-sm transition-opacity hover:opacity-90 sm:inline-flex sm:min-h-[44px] sm:text-sm md:px-4"
                >
                  Sign up for free delivery
                </button>

                <LanguageSwitcher className="hidden sm:block" />
              </>
            )}

            <Link
              href="/dashboard/cart"
              className="relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-brand-dark shadow-inner transition-colors hover:bg-brand-secondary/70"
              aria-label={`Shopping cart${cartCount ? `, ${cartCount} items` : ""}`}
            >
              <AiOutlineShopping className="text-xl text-brand-muted" />
              {cartCount > 0 ? (
                <span className="absolute -right-1 -top-1 flex min-h-[1.125rem] min-w-[1.125rem] items-center justify-center rounded-full bg-brand-primary px-1 text-[10px] font-bold text-white">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              ) : null}
            </Link>
          </div>
        </div>

        {/* Mobile CTA strip (logged-out): show short sign-up when primary CTA hidden */}
        {!user ? (
          <div className="flex justify-center border-t border-black/[0.06] px-3 py-2 sm:hidden">
            <button
              type="button"
              onClick={() => openAuthModal("signup")}
              className="min-h-[44px] w-full touch-manipulation rounded-lg bg-brand-primary py-3 text-center text-sm font-semibold text-white shadow-sm active:opacity-95"
            >
              Sign up for free delivery
            </button>
          </div>
        ) : null}

        {/* —— Row 2: service tabs + search —— */}
        <div className="mx-auto flex max-w-[1400px] flex-col gap-3 px-3 pb-3 sm:px-4 sm:pb-4 lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:pb-5">
          <nav
            className="-mx-1 flex gap-2 overflow-x-auto overscroll-x-contain pb-1 pl-1 [-webkit-overflow-scrolling:touch] sm:-mx-2 sm:gap-3 sm:pl-2 lg:mx-0 lg:flex-wrap lg:gap-8 lg:overflow-visible lg:pb-0"
            aria-label="Ordering options"
          >
            <ServiceTab
              href="/"
              label="Delivery"
              icon={MdDeliveryDining}
              active={isMarketplaceHome && !isPickup}
            />
            <ServiceTab
              href="/?service=pickup"
              label="Pick-up"
              icon={FaWalking}
              active={isMarketplaceHome && isPickup}
            />
            <ServiceTab
              href="/ourMenu"
              label="Menu"
              icon={MdShoppingBag}
              active={pathname.startsWith("/ourMenu")}
            />
            <ServiceTab
              href="/contact"
              label="Shops"
              icon={MdStorefront}
              active={pathname.startsWith("/contact")}
            />
          </nav>

          <form
            onSubmit={submitSearch}
            className="relative w-full shrink-0 lg:max-w-md xl:max-w-xl"
            role="search"
          >
            <FiSearch
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-brand-muted"
              aria-hidden
            />
            <input
              type="search"
              name="q"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for restaurants, cuisines, and dishes"
              className="w-full rounded-full border border-transparent bg-neutral-100 py-2.5 pl-11 pr-4 text-base text-brand-dark placeholder:text-brand-muted outline-none ring-brand-primary ring-offset-2 ring-offset-brand-background transition-shadow focus:border-brand-primary/50 focus:bg-white focus:shadow-md focus:ring-2 sm:text-sm"
              autoComplete="off"
              enterKeyHint="search"
            />
          </form>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        id="mobile-nav-panel"
        className={`fixed inset-0 z-[70] lg:hidden ${
          mobileOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!mobileOpen}
      >
        <button
          type="button"
          className={`absolute inset-0 bg-black/40 transition-opacity ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
          aria-label="Close menu"
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={`absolute left-0 top-0 flex h-full w-[min(20rem,calc(100vw-1rem))] flex-col bg-brand-background pb-[max(1rem,env(safe-area-inset-bottom))] shadow-xl transition-transform duration-200 ease-out ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-black/[0.08] px-4 py-3">
            <span className="font-semibold text-brand-dark">Menu</span>
            <button
              type="button"
              className="rounded-lg p-2 text-brand-muted hover:bg-brand-secondary/40"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
            >
              <MdClose className="text-2xl" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4">
            {user ? (
              <div className="mb-6 rounded-xl bg-brand-secondary/30 px-4 py-3">
                <p className="text-xs font-medium uppercase tracking-wide text-brand-muted">
                  Signed in as
                </p>
                <p className="truncate font-semibold capitalize text-brand-dark">
                  {displayName}
                </p>
                <p className="truncate text-sm text-brand-muted">{user?.email}</p>
              </div>
            ) : null}

            <div className="flex flex-col gap-1">
              <Link
                href="/home"
                className="rounded-lg px-3 py-3 font-medium text-brand-dark hover:bg-brand-secondary/40"
                onClick={() => setMobileOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/ourMenu"
                className="rounded-lg px-3 py-3 font-medium text-brand-dark hover:bg-brand-secondary/40"
                onClick={() => setMobileOpen(false)}
              >
                Menu
              </Link>
              <Link
                href="/"
                className="rounded-lg px-3 py-3 font-medium text-brand-dark hover:bg-brand-secondary/40"
                onClick={() => setMobileOpen(false)}
              >
                Restaurants
              </Link>
              <Link
                href="/dashboard"
                className="rounded-lg px-3 py-3 font-medium text-brand-dark hover:bg-brand-secondary/40"
                onClick={() => setMobileOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                href="/contact"
                className="rounded-lg px-3 py-3 font-medium text-brand-dark hover:bg-brand-secondary/40"
                onClick={() => setMobileOpen(false)}
              >
                Contact
              </Link>
            </div>

            <LanguageSwitcher
              variant="inline"
              className="mt-6 lg:hidden"
              onNavigate={() => setMobileOpen(false)}
            />

            <div className="mt-8 border-t border-black/[0.08] pt-6">
              {user ? (
                <>
                  <Link
                    href="/dashboard/cart"
                    className="mb-3 flex items-center gap-3 rounded-lg px-3 py-3 font-medium text-brand-dark hover:bg-brand-secondary/40"
                    onClick={() => setMobileOpen(false)}
                  >
                    <AiOutlineShopping className="text-xl" />
                    Cart{cartCount ? ` (${cartCount})` : ""}
                  </Link>
                  <button
                    type="button"
                    className="w-full rounded-lg px-3 py-3 text-left font-medium text-brand-dark hover:bg-brand-secondary/40"
                    onClick={handleLogout}
                  >
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    className="mb-3 block w-full rounded-lg border border-brand-dark px-4 py-3 text-center font-semibold text-brand-dark"
                    onClick={() => {
                      setMobileOpen(false);
                      openAuthModal("login");
                    }}
                  >
                    Log in
                  </button>
                  <button
                    type="button"
                    className="block w-full rounded-lg bg-brand-primary px-4 py-3 text-center font-semibold text-white"
                    onClick={() => {
                      setMobileOpen(false);
                      openAuthModal("signup");
                    }}
                  >
                    Sign up for free delivery
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
