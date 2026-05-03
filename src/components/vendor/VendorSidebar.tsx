"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MdOutlineRestaurantMenu,
  MdOutlineShoppingBag,
  MdOutlineStorefront,
  MdOutlineDashboard,
} from "react-icons/md";
import { FiExternalLink } from "react-icons/fi";

const NAV = [
  { href: "/vendor", label: "Overview", icon: MdOutlineDashboard },
  { href: "/vendor/restaurant", label: "Restaurant", icon: MdOutlineStorefront },
  { href: "/vendor/menu", label: "Menu & products", icon: MdOutlineRestaurantMenu },
  { href: "/vendor/orders", label: "Orders", icon: MdOutlineShoppingBag },
];

export default function VendorSidebar({
  onNavigate,
}: {
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1 p-3">
      <p className="px-3 pb-2 text-[0.65rem] font-semibold uppercase tracking-wider text-teal-200/90">
        Manage
      </p>
      {NAV.map(({ href, label, icon: Icon }) => {
        const active =
          href === "/vendor"
            ? pathname === "/vendor"
            : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            onClick={() => onNavigate?.()}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
              active
                ? "bg-vendor-sidebarHover text-white shadow-inner"
                : "text-teal-100/95 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Icon className="shrink-0 text-lg opacity-95" aria-hidden />
            {label}
          </Link>
        );
      })}
      <div className="my-3 border-t border-white/10" />
      <Link
        href="/"
        onClick={() => onNavigate?.()}
        className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-teal-100/90 hover:bg-white/10 hover:text-white"
      >
        <FiExternalLink className="shrink-0" aria-hidden />
        Customer site
      </Link>
    </nav>
  );
}
