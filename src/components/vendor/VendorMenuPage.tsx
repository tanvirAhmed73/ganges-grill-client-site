"use client";

import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import {
  apiCreateProduct,
  apiDeleteProduct,
  apiGetMyProducts,
  apiPatchProduct,
} from "@/lib/api/restaurant-owner-api";
import { getApiErrorMessage } from "@/lib/api/api-error";
import { MdAdd, MdClose, MdDeleteOutline, MdEdit } from "react-icons/md";

type Product = {
  id: string;
  name: string;
  description?: string;
  image: string;
  category: string;
  price: number;
  isAvailable: boolean;
  sortOrder: number;
};

type FormValues = {
  name: string;
  description: string;
  image: string;
  category: string;
  price: string;
  isAvailable: boolean;
  sortOrder: string;
};

const emptyForm: FormValues = {
  name: "",
  description: "",
  image: "",
  category: "",
  price: "",
  isAvailable: true,
  sortOrder: "0",
};

export default function VendorMenuPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [listError, setListError] = useState<string | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<FormValues>({ defaultValues: emptyForm });

  const load = useCallback(async () => {
    setListError(null);
    try {
      const { data } = await apiGetMyProducts();
      setProducts(Array.isArray(data?.products) ? data.products : []);
    } catch (e) {
      setListError(getApiErrorMessage(e));
      setProducts([]);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      await load();
      if (!cancelled) setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [load]);

  const openCreate = () => {
    setEditingId(null);
    reset(emptyForm);
    setPanelOpen(true);
  };

  const openEdit = (p: Product) => {
    setEditingId(p.id);
    reset({
      name: p.name ?? "",
      description: p.description ?? "",
      image: p.image ?? "",
      category: p.category ?? "",
      price: String(p.price ?? ""),
      isAvailable: p.isAvailable !== false,
      sortOrder: String(p.sortOrder ?? 0),
    });
    setPanelOpen(true);
  };

  const closePanel = () => {
    setPanelOpen(false);
    setEditingId(null);
    reset(emptyForm);
  };

  const onSubmit = async (values: FormValues) => {
    const price = Number(values.price);
    if (Number.isNaN(price) || price < 0) {
      await Swal.fire({
        icon: "error",
        title: "Invalid price",
        text: "Enter a valid number for price.",
      });
      return;
    }
    const sortOrder = Number.parseInt(values.sortOrder, 10);
    const body = {
      name: values.name.trim(),
      description: values.description.trim(),
      image: values.image.trim(),
      category: values.category.trim(),
      price,
      isAvailable: values.isAvailable,
      sortOrder: Number.isNaN(sortOrder) ? 0 : sortOrder,
    };
    try {
      if (editingId) {
        await apiPatchProduct(editingId, body);
      } else {
        await apiCreateProduct(body);
      }
      await load();
      closePanel();
    } catch (e) {
      await Swal.fire({
        icon: "error",
        title: "Could not save",
        text: getApiErrorMessage(e),
      });
    }
  };

  const onDelete = async (p: Product) => {
    const r = await Swal.fire({
      icon: "warning",
      title: "Delete product?",
      text: p.name,
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "#dc2626",
    });
    if (!r.isConfirmed) return;
    try {
      await apiDeleteProduct(p.id);
      await load();
    } catch (e) {
      await Swal.fire({
        icon: "error",
        title: "Could not delete",
        text: getApiErrorMessage(e),
      });
    }
  };

  const inputCls =
    "mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-vendor-ink outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/30";

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-vendor-ink sm:text-3xl">
            Menu &amp; products
          </h1>
          <p className="mt-1 text-sm text-vendor-muted">
            Add dishes with image URL, price, and category. Drag order uses{" "}
            <code className="rounded bg-slate-100 px-1">sortOrder</code>.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-vendor-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-800"
        >
          <MdAdd className="text-xl" aria-hidden />
          Add product
        </button>
      </div>

      {listError ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {listError}
        </div>
      ) : null}

      {loading ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-40 animate-pulse rounded-2xl bg-teal-100/40" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-vendor-border bg-white/80 px-6 py-16 text-center">
          <p className="text-vendor-muted">No products yet. Add your first dish.</p>
          <button
            type="button"
            onClick={openCreate}
            className="mt-4 text-sm font-semibold text-vendor-primary hover:underline"
          >
            Add product
          </button>
        </div>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {products.map((p) => (
            <li
              key={p.id}
              className="flex gap-3 rounded-2xl border border-vendor-border bg-white p-3 shadow-sm"
            >
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.image || "https://placehold.co/160x160/e2e8f0/64748b?text=IMG"}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-vendor-ink">{p.name}</p>
                <p className="text-xs text-vendor-muted">{p.category}</p>
                <p className="mt-1 text-sm font-semibold text-vendor-primary">
                  {new Intl.NumberFormat(undefined, {
                    style: "currency",
                    currency: "USD",
                  }).format(p.price)}
                  {!p.isAvailable ? (
                    <span className="ml-2 text-xs font-normal text-amber-700">
                      Unavailable
                    </span>
                  ) : null}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => openEdit(p)}
                    className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2 py-1 text-xs font-medium text-vendor-ink hover:bg-slate-50"
                  >
                    <MdEdit aria-hidden />
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(p)}
                    className="inline-flex items-center gap-1 rounded-lg border border-red-100 px-2 py-1 text-xs font-medium text-red-700 hover:bg-red-50"
                  >
                    <MdDeleteOutline aria-hidden />
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {panelOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="product-form-title"
        >
          <div className="max-h-[min(90dvh,720px)] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-4 py-3">
              <h2 id="product-form-title" className="text-lg font-bold text-vendor-ink">
                {editingId ? "Edit product" : "New product"}
              </h2>
              <button
                type="button"
                onClick={closePanel}
                className="rounded-lg p-2 text-vendor-muted hover:bg-slate-100"
                aria-label="Close"
              >
                <MdClose className="text-2xl" />
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 sm:p-6">
              <div>
                <label className="text-sm font-medium text-vendor-ink">
                  Name *
                  <input className={inputCls} required {...register("name")} />
                </label>
              </div>
              <div>
                <label className="text-sm font-medium text-vendor-ink">
                  Image URL *
                  <input className={inputCls} type="url" required {...register("image")} />
                </label>
              </div>
              <div>
                <label className="text-sm font-medium text-vendor-ink">
                  Category *
                  <input className={inputCls} required {...register("category")} />
                </label>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <label className="text-sm font-medium text-vendor-ink">
                  Price *
                  <input
                    className={inputCls}
                    inputMode="decimal"
                    required
                    {...register("price")}
                  />
                </label>
                <label className="text-sm font-medium text-vendor-ink">
                  Sort order
                  <input className={inputCls} {...register("sortOrder")} />
                </label>
              </div>
              <div>
                <label className="text-sm font-medium text-vendor-ink">
                  Description
                  <textarea
                    rows={3}
                    className={`${inputCls} resize-y`}
                    {...register("description")}
                  />
                </label>
              </div>
              <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-vendor-ink">
                <input type="checkbox" className="rounded border-slate-300" {...register("isAvailable")} />
                Available for ordering
              </label>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={closePanel}
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-vendor-ink hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-xl bg-vendor-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-800 disabled:opacity-60"
                >
                  {isSubmitting ? "Saving…" : editingId ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
