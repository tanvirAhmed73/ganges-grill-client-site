"use client";

import { Suspense, type ReactNode } from "react";
import CartFloatingBar from "@/components/layout/CartFloatingBar";
import Footer from "@/components/layout/Footer";
import AddressPickerModal from "@/components/address/AddressPickerModal";
import Navbar from "@/components/layout/Navbar";
import SiteMainPadding from "@/components/layout/SiteMainPadding";
import BurgerEatingLoader from "@/components/ui/BurgerEatingLoader";
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
    return <BurgerEatingLoader />;
  }

  return (
    <div>
      <Suspense fallback={<NavbarFallback />}>
        <Navbar />
      </Suspense>
      <AddressPickerModal />
      <SiteMainPadding>
        {children}
        <Footer />
      </SiteMainPadding>
      <CartFloatingBar />
    </div>
  );
}
