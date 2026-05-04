"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { MdClose, MdLocationOn, MdMyLocation, MdOutlineMap } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { useDeliveryAddress } from "@/contexts/delivery-address-context";
import {
  filterMockAddresses,
  MOCK_DHAKA_ADDRESSES,
  type MockAddressSuggestion,
} from "@/lib/address/mock-addresses";

const DEMO_OFFSET = 0.004;

export default function AddressPickerModal() {
  const { t } = useTranslation("common");
  const { pickerOpen, closeAddressPicker, setSavedAddress, saved } = useDeliveryAddress();
  const [query, setQuery] = useState("");
  const [highlightId, setHighlightId] = useState<string | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const suggestions = useMemo(() => filterMockAddresses(query), [query]);

  const selected: MockAddressSuggestion | null = useMemo(
    () => MOCK_DHAKA_ADDRESSES.find((a) => a.id === highlightId) ?? null,
    [highlightId]
  );

  useEffect(() => {
    if (!pickerOpen) return;
    setQuery("");
    if (saved) {
      const m = MOCK_DHAKA_ADDRESSES.find(
        (a) => a.label === saved.label || a.detail === saved.detail
      );
      setHighlightId(m?.id ?? null);
    } else {
      setHighlightId(null);
    }
    const tmt = window.setTimeout(() => searchRef.current?.focus(), 150);
    return () => window.clearTimeout(tmt);
  }, [pickerOpen, saved]);

  useEffect(() => {
    if (!pickerOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [pickerOpen]);

  const confirmSelection = useCallback(
    (item: MockAddressSuggestion) => {
      setSavedAddress({
        label: item.label,
        detail: item.detail,
        area: item.area,
        lat: 23.79 + (Math.random() - 0.5) * DEMO_OFFSET,
        lng: 90.41 + (Math.random() - 0.5) * DEMO_OFFSET,
      });
      closeAddressPicker();
    },
    [closeAddressPicker, setSavedAddress]
  );

  const onBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) closeAddressPicker();
  };

  if (!pickerOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="address-picker-title"
      onClick={onBackdropClick}
    >
      <div
        className="flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bg-brand-background shadow-2xl sm:max-h-[85vh] sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-black/[0.06] bg-white px-4 py-3 sm:px-5">
          <h2 id="address-picker-title" className="text-lg font-bold text-brand-dark">
            {t("addressPicker.title")}
          </h2>
          <button
            type="button"
            onClick={closeAddressPicker}
            className="rounded-full p-2 text-brand-muted hover:bg-brand-secondary/40 hover:text-brand-dark"
            aria-label={t("nav.closeMenu")}
          >
            <MdClose className="text-2xl" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto">
          {/* Replace inner visual with <GoogleMap /> when API key is configured */}
          <div className="relative aspect-[16/10] w-full bg-neutral-200 sm:aspect-[16/9]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=60)",
              }}
              aria-hidden
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative flex flex-col items-center">
                <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-brand-primary text-white shadow-lg ring-4 ring-white/90">
                  <MdLocationOn className="text-3xl" aria-hidden />
                </span>
                <span className="mt-2 max-w-[85%] truncate rounded-full bg-white/95 px-3 py-1 text-center text-xs font-semibold text-brand-dark shadow-md">
                  {selected?.label ??
                    t("addressPicker.dropPin")}
                </span>
              </div>
            </div>
            <div className="absolute bottom-3 left-3 right-3 flex items-start gap-2 rounded-xl bg-white/95 px-3 py-2 text-xs text-brand-muted shadow-md backdrop-blur-sm">
              <MdOutlineMap className="mt-0.5 shrink-0 text-brand-primary" aria-hidden />
              <p>
                <span className="font-semibold text-brand-dark">
                  {t("addressPicker.mapPreview")}
                </span>{" "}
                — {t("addressPicker.mapHint")}
              </p>
            </div>
          </div>
          <div id="gg-google-map-root" className="sr-only" aria-hidden data-gg-map-placeholder />

          <div className="border-b border-black/[0.06] bg-white px-4 py-4 sm:px-5">
            <label className="relative block">
              <FiSearch className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-muted" />
              <input
                ref={searchRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("addressPicker.searchPlaceholder")}
                className="min-h-12 w-full rounded-xl border border-black/[0.1] bg-brand-background py-3 pl-11 pr-4 text-sm text-brand-dark outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
                autoComplete="off"
              />
            </label>

            <ul className="mt-3 max-h-48 space-y-0 overflow-y-auto rounded-xl border border-black/[0.06] bg-white sm:max-h-56">
              {suggestions.length === 0 ? (
                <li className="px-4 py-6 text-center text-sm text-brand-muted">
                  {t("addressPicker.noResults")}
                </li>
              ) : (
                suggestions.map((item) => (
                  <li key={item.id} className="border-b border-black/[0.04] last:border-0">
                    <button
                      type="button"
                      onClick={() => setHighlightId(item.id)}
                      className={`flex w-full items-start gap-3 px-4 py-3.5 text-left transition hover:bg-brand-secondary/30 ${
                        highlightId === item.id ? "bg-brand-secondary/45" : ""
                      }`}
                    >
                      <MdLocationOn className="mt-0.5 shrink-0 text-xl text-brand-primary" />
                      <span>
                        <span className="block font-semibold text-brand-dark">{item.label}</span>
                        <span className="mt-0.5 block text-xs text-brand-muted">{item.detail}</span>
                      </span>
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>

          <div className="space-y-4 px-4 py-5 sm:px-5">
            {selected ? (
              <div className="rounded-2xl border border-brand-primary/25 bg-brand-primary/5 px-4 py-3">
                <p className="text-xs font-bold uppercase tracking-wide text-brand-primary">
                  {t("addressPicker.selected")}
                </p>
                <p className="mt-1 font-semibold text-brand-dark">{selected.label}</p>
                <p className="text-sm text-brand-muted">{selected.detail}</p>
              </div>
            ) : (
              <p className="text-center text-sm text-brand-muted">
                {t("addressPicker.pickPrompt")}
              </p>
            )}

            <button
              type="button"
              onClick={() => selected && confirmSelection(selected)}
              disabled={!selected}
              className="flex w-full min-h-12 items-center justify-center gap-2 rounded-xl bg-brand-primary py-3 text-sm font-bold text-white shadow-md shadow-brand-primary/25 hover:bg-brand-primary/90 disabled:cursor-not-allowed disabled:opacity-45"
            >
              <MdMyLocation className="text-xl" aria-hidden />
              {t("addressPicker.confirm")}
            </button>

            <p className="text-center text-xs text-brand-muted">{t("addressPicker.demoNote")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
