"use client";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useWishlist } from "@/contexts/wishlist-context";
import type { MenuItemShape } from "@/components/shop/ProductCard";

type Props = {
  item: MenuItemShape;
  className?: string;
  /** Larger tap target on cards */
  size?: "sm" | "md";
};

export default function WishlistToggle({
  item,
  className = "",
  size = "md",
}: Props) {
  const { isInWishlist, toggle } = useWishlist();
  const active = isInWishlist(item._id);
  const iconClass =
    size === "sm" ? "text-lg" : "text-xl";

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle({
          id: item._id,
          name: item.name,
          image: item.image,
          price: item.price,
          category: item.category,
        });
      }}
      className={`inline-flex min-h-10 min-w-10 items-center justify-center rounded-full bg-white/95 text-brand-primary shadow-md ring-1 ring-black/5 transition hover:bg-white hover:scale-105 ${className}`}
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      aria-pressed={active}
    >
      {active ? (
        <AiFillHeart className={`${iconClass} text-brand-primary`} aria-hidden />
      ) : (
        <AiOutlineHeart className={`${iconClass} text-brand-muted`} aria-hidden />
      )}
    </button>
  );
}
