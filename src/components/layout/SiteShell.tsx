"use client";

import { Suspense, type ReactNode } from "react";
import { ClockLoader } from "react-spinners";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import useAuth from "@/hooks/useAuth";

function NavbarFallback() {
  return (
    <div
      className="h-12 border-b border-black/[0.06] bg-brand-background sm:h-14"
      aria-hidden
    />
  );
}

export default function SiteShell({ children }: { children: ReactNode }) {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
        <ClockLoader color="#36d7b7" speedMultiplier={4} size={250} />
      </div>
    );
  }

  return (
    <div>
      <Suspense fallback={<NavbarFallback />}>
        <Navbar />
      </Suspense>
      {children}
      <Footer />
    </div>
  );
}
