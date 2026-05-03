"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  apiGetMyRestaurant,
  apiPatchMyRestaurant,
} from "@/lib/api/restaurant-owner-api";
import { getApiErrorMessage } from "@/lib/api/api-error";

type FormValues = {
  name: string;
  description: string;
  phone: string;
  addressLine1: string;
  city: string;
  postalCode: string;
  category: string;
  eta: string;
  image: string;
  slug: string;
};

const defaults: FormValues = {
  name: "",
  description: "",
  phone: "",
  addressLine1: "",
  city: "",
  postalCode: "",
  category: "",
  eta: "",
  image: "",
  slug: "",
};

export default function VendorRestaurantPage() {
  const [loadError, setLoadError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [savedAt, setSavedAt] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<FormValues>({ defaultValues: defaults });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setLoadError(null);
      try {
        const { data } = await apiGetMyRestaurant();
        const r = data?.restaurant;
        if (!r || cancelled) return;
        reset({
          name: r.name ?? "",
          description: r.description ?? "",
          phone: r.phone ?? "",
          addressLine1: r.addressLine1 ?? "",
          city: r.city ?? "",
          postalCode: r.postalCode ?? "",
          category: r.category ?? "",
          eta: r.eta ?? "",
          image: r.image ?? "",
          slug: r.slug ?? "",
        });
      } catch (e) {
        if (!cancelled) setLoadError(getApiErrorMessage(e));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [reset]);

  const onSubmit = async (values: FormValues) => {
    setSubmitError(null);
    setSavedAt(null);
    try {
      const body: Record<string, unknown> = {};
      (Object.keys(values) as (keyof FormValues)[]).forEach((k) => {
        const v = values[k]?.trim();
        if (v !== "") body[k] = v;
      });
      await apiPatchMyRestaurant(body);
      setSavedAt(new Date().toISOString());
      const { data } = await apiGetMyRestaurant();
      const r = data?.restaurant;
      if (r) {
        reset({
          name: r.name ?? "",
          description: r.description ?? "",
          phone: r.phone ?? "",
          addressLine1: r.addressLine1 ?? "",
          city: r.city ?? "",
          postalCode: r.postalCode ?? "",
          category: r.category ?? "",
          eta: r.eta ?? "",
          image: r.image ?? "",
          slug: r.slug ?? "",
        });
      }
    } catch (e) {
      setSubmitError(getApiErrorMessage(e));
    }
  };

  const inputCls =
    "mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-vendor-ink shadow-sm outline-none ring-vendor-border placeholder:text-slate-400 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/30";

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 animate-pulse rounded-lg bg-teal-100/50" />
        <div className="h-64 animate-pulse rounded-2xl bg-teal-100/30" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-vendor-ink sm:text-3xl">
          Restaurant profile
        </h1>
        <p className="mt-1 text-sm text-vendor-muted">
          Customers see this information on discovery and your listing. Slug must stay
          unique.
        </p>
      </div>

      {loadError ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {loadError}
        </div>
      ) : null}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 rounded-2xl border border-vendor-border bg-white p-5 shadow-sm sm:p-8"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="text-sm font-medium text-vendor-ink">
              Restaurant name
              <input className={inputCls} {...register("name")} />
            </label>
          </div>
          <div>
            <label className="text-sm font-medium text-vendor-ink">
              Slug (URL)
              <input className={inputCls} {...register("slug")} />
            </label>
          </div>
          <div>
            <label className="text-sm font-medium text-vendor-ink">
              Category
              <input className={inputCls} {...register("category")} />
            </label>
          </div>
          <div className="sm:col-span-2">
            <label className="text-sm font-medium text-vendor-ink">
              Description
              <textarea
                rows={4}
                className={`${inputCls} resize-y min-h-[100px]`}
                {...register("description")}
              />
            </label>
          </div>
          <div>
            <label className="text-sm font-medium text-vendor-ink">
              Phone
              <input className={inputCls} type="tel" {...register("phone")} />
            </label>
          </div>
          <div>
            <label className="text-sm font-medium text-vendor-ink">
              ETA (e.g. 25 min)
              <input className={inputCls} {...register("eta")} />
            </label>
          </div>
          <div className="sm:col-span-2">
            <label className="text-sm font-medium text-vendor-ink">
              Cover image URL
              <input className={inputCls} type="url" {...register("image")} />
            </label>
          </div>
          <div className="sm:col-span-2">
            <label className="text-sm font-medium text-vendor-ink">
              Address line 1
              <input className={inputCls} {...register("addressLine1")} />
            </label>
          </div>
          <div>
            <label className="text-sm font-medium text-vendor-ink">
              City
              <input className={inputCls} {...register("city")} />
            </label>
          </div>
          <div>
            <label className="text-sm font-medium text-vendor-ink">
              Postal code
              <input className={inputCls} {...register("postalCode")} />
            </label>
          </div>
        </div>

        {submitError ? (
          <p className="text-sm text-red-600" role="alert">
            {submitError}
          </p>
        ) : null}
        {savedAt ? (
          <p className="text-sm text-emerald-700">Saved successfully.</p>
        ) : null}

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-vendor-primary px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-800 disabled:opacity-60"
          >
            {isSubmitting ? "Saving…" : "Save changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
