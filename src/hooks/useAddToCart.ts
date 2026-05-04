"use client";

import { useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import {
  addDemoCartLine,
  isDemoFoodId,
} from "@/lib/cart/demo-cart-storage";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import type { MenuItemShape } from "@/components/shop/ProductCard";

export function useAddToCart() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const invalidateCart = () => {
    if (user?.email) {
      queryClient.invalidateQueries({ queryKey: ["cart", user.email] });
    }
  };

  const addToCart = async (item: MenuItemShape) => {
    const { _id, name, image, price } = item;
    if (!user?.email) {
      Swal.fire({
        title: "Sign in required",
        text: "Log in to add items to your cart.",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#FF6B35",
        cancelButtonColor: "#94a3b8",
        confirmButtonText: "Log in",
      }).then((r) => {
        if (r.isConfirmed) router.push(`/login?from=${encodeURIComponent(pathname)}`);
      });
      return;
    }

    if (isDemoFoodId(_id)) {
      addDemoCartLine(user.email, { _id, name, image, price });
      invalidateCart();
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: `${name} added to cart`,
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    try {
      const res = await axiosSecure.post("/cart", {
        foodId: _id,
        email: user.email,
        name,
        image,
        price,
      });
      if (res.data?.insertedId) {
        invalidateCart();
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: `${name} added to cart`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch {
      Swal.fire({
        icon: "error",
        title: "Could not add to cart",
        text: "Check your connection or try again.",
      });
    }
  };

  return { addToCart };
}
