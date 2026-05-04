"use client";

import "@/i18n/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import AuthEntryModal from "@/components/auth/AuthEntryModal";
import PendingVerificationGate from "@/components/auth/PendingVerificationGate";
import TopPromoBanner from "@/components/layout/top-promo/TopPromoBanner";
import { AuthModalProvider } from "@/contexts/auth-modal-context";
import { LocaleProvider } from "@/contexts/locale-context";
import AuthProvider from "@/providers/AuthProvider";
import AxiosSecureSetup from "@/providers/AxiosSecureSetup";
import { WishlistProvider } from "@/contexts/wishlist-context";
import { DeliveryAddressProvider } from "@/contexts/delivery-address-context";

export default function AppProviders({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <LocaleProvider>
        <DeliveryAddressProvider>
          <AuthProvider>
            <WishlistProvider>
              <AuthModalProvider>
                <AxiosSecureSetup />
                {/* Anonymous-only promo; must stay inside AuthProvider */}
                <TopPromoBanner />
                <AuthEntryModal />
                <PendingVerificationGate />
                {children}
              </AuthModalProvider>
            </WishlistProvider>
          </AuthProvider>
        </DeliveryAddressProvider>
      </LocaleProvider>
    </QueryClientProvider>
  );
}
