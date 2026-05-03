"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ClockLoader } from "react-spinners";
import useAuth from "@/hooks/useAuth";

export default function VendorRoute({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace("/login?from=/vendor");
      return;
    }
    if (user.role !== "restaurant_owner") {
      router.replace("/");
    }
  }, [loading, user, router]);

  if (loading || !user || user.role !== "restaurant_owner") {
    return (
      <div className="fixed left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3">
        <ClockLoader color="#14b8a6" speedMultiplier={2} size={72} />
        <p className="text-sm text-vendor-muted">Loading vendor portal…</p>
      </div>
    );
  }

  return children;
}
