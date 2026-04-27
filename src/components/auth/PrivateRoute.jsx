"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ClockLoader } from "react-spinners";
import useAuth from "@/hooks/useAuth";

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace(`/login?from=${encodeURIComponent(pathname)}`);
    }
  }, [loading, user, pathname, router]);

  if (loading) {
    return (
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform">
        <ClockLoader color="#36d7b7" speedMultiplier={4} size={250} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform">
        <ClockLoader color="#36d7b7" speedMultiplier={4} size={250} />
      </div>
    );
  }

  return children;
}
