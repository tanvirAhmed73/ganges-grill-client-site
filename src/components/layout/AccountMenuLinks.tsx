"use client";

import Link from "next/link";
import type { IconType } from "react-icons";
import {
  MdAccountBalanceWallet,
  MdConfirmationNumber,
  MdEmojiEvents,
  MdFavoriteBorder,
  MdHelpOutline,
  MdLogout,
  MdOutlineStorefront,
  MdReceiptLong,
  MdShoppingBag,
  MdWorkspacePremium,
} from "react-icons/md";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { useTranslation } from "react-i18next";

const rowClass =
  "flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm font-medium text-neutral-800 transition-colors hover:bg-neutral-50";

type AccountMenuLinksProps = {
  /** Close dropdown / drawer after navigation */
  onNavigate?: () => void;
  onLogout: () => void;
  /** Show link to restaurant-owner portal */
  vendorPortal?: boolean;
};

export default function AccountMenuLinks({
  onNavigate,
  onLogout,
  vendorPortal,
}: AccountMenuLinksProps) {
  const { t } = useTranslation("common");

  function Item({
    href,
    icon: Icon,
    labelKey,
  }: {
    href: string;
    icon: IconType;
    labelKey: string;
  }) {
    return (
      <Link
        href={href}
        className={rowClass}
        onClick={() => onNavigate?.()}
      >
        <Icon className="shrink-0 text-xl text-neutral-500" aria-hidden />
        <span>{t(labelKey)}</span>
      </Link>
    );
  }

  return (
    <div className="py-1">
      {vendorPortal ? (
        <Link
          href="/vendor"
          className={`${rowClass} bg-teal-50/90 text-teal-900 hover:bg-teal-100`}
          onClick={() => onNavigate?.()}
        >
          <MdOutlineStorefront
            className="shrink-0 text-xl text-teal-700"
            aria-hidden
          />
          <span>{t("nav.vendorPortal")}</span>
        </Link>
      ) : null}
      <Item href="/wishlist" icon={MdFavoriteBorder} labelKey="nav.wishlist" />
      <Item href="/wallet" icon={MdAccountBalanceWallet} labelKey="nav.ggPay" />
      <Item
        href="/contact"
        icon={MdWorkspacePremium}
        labelKey="nav.subscribeFreeDelivery"
      />
      <Item href="/orders" icon={MdReceiptLong} labelKey="nav.ordersReorder" />
      <Item href="/dashboard" icon={HiOutlineUserCircle} labelKey="nav.profile" />
      <Item
        href="/cart"
        icon={MdShoppingBag}
        labelKey="nav.myCart"
      />
      <Item
        href="/vouchers"
        icon={MdConfirmationNumber}
        labelKey="nav.vouchers"
      />
      <Item href="/rewards" icon={MdEmojiEvents} labelKey="nav.ggRewards" />
      <Item href="/contact" icon={MdHelpOutline} labelKey="nav.helpCenter" />

      <button
        type="button"
        className={`${rowClass} mt-1 border-t border-black/[0.06] text-red-700 hover:bg-red-50`}
        onClick={() => {
          onNavigate?.();
          onLogout();
        }}
      >
        <MdLogout className="shrink-0 text-xl text-red-600" aria-hidden />
        <span>{t("nav.logOut")}</span>
      </button>
    </div>
  );
}
