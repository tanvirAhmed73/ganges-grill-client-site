"use client";

import VendorRoute from "@/components/auth/VendorRoute";
import VendorShell from "@/components/vendor/VendorShell";

export default function VendorLayout({ children }) {
  return (
    <VendorRoute>
      <VendorShell>{children}</VendorShell>
    </VendorRoute>
  );
}
