"use client";

import type { ReactNode } from "react";
import useAuth from "@/hooks/useAuth";
import useCart from "@/hooks/useCart";

/** Bottom padding when floating cart bar is visible so content isn’t hidden behind it */
export default function SiteMainPadding({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [cart] = useCart();
  const showBar = !!user?.email && (cart?.length ?? 0) > 0;

  return (
    <div className={showBar ? "pb-[calc(5.5rem+env(safe-area-inset-bottom))]" : undefined}>
      {children}
    </div>
  );
}
