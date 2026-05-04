"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "gg_delivery_address_v1";

export type SavedDeliveryAddress = {
  label: string;
  detail: string;
  area: string;
  lat?: number;
  lng?: number;
};

type DeliveryAddressContextValue = {
  saved: SavedDeliveryAddress | null;
  setSavedAddress: (addr: SavedDeliveryAddress | null) => void;
  pickerOpen: boolean;
  openAddressPicker: () => void;
  closeAddressPicker: () => void;
};

const DeliveryAddressContext = createContext<DeliveryAddressContextValue | null>(null);

function loadFromStorage(): SavedDeliveryAddress | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const p = JSON.parse(raw) as SavedDeliveryAddress;
    if (p && typeof p.label === "string" && typeof p.detail === "string") return p;
  } catch {
    /* ignore */
  }
  return null;
}

function persist(addr: SavedDeliveryAddress | null) {
  if (typeof window === "undefined") return;
  try {
    if (!addr) localStorage.removeItem(STORAGE_KEY);
    else localStorage.setItem(STORAGE_KEY, JSON.stringify(addr));
  } catch {
    /* ignore */
  }
}

export function DeliveryAddressProvider({ children }: { children: ReactNode }) {
  const [saved, setSaved] = useState<SavedDeliveryAddress | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);

  useEffect(() => {
    setSaved(loadFromStorage());
  }, []);

  const setSavedAddress = useCallback((addr: SavedDeliveryAddress | null) => {
    setSaved(addr);
    persist(addr);
  }, []);

  const openAddressPicker = useCallback(() => setPickerOpen(true), []);
  const closeAddressPicker = useCallback(() => setPickerOpen(false), []);

  const value = useMemo(
    () => ({
      saved,
      setSavedAddress,
      pickerOpen,
      openAddressPicker,
      closeAddressPicker,
    }),
    [saved, setSavedAddress, pickerOpen, openAddressPicker, closeAddressPicker]
  );

  return (
    <DeliveryAddressContext.Provider value={value}>{children}</DeliveryAddressContext.Provider>
  );
}

export function useDeliveryAddress() {
  const ctx = useContext(DeliveryAddressContext);
  if (!ctx) {
    throw new Error("useDeliveryAddress must be used within DeliveryAddressProvider");
  }
  return ctx;
}
