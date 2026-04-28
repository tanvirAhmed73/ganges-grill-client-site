"use client";

import Swal from "sweetalert2";
import { usePathname, useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useCart from "@/hooks/useCart";

export default function OrderPageCard({ item }) {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { _id, name, image, price, recipe } = item;
  const router = useRouter();
  const pathname = usePathname();
  const [, refetch] = useCart();

  const handleAddToCart = () => {
    if (user && user.email) {
      const cartItem = {
        foodId: _id,
        email: user.email,
        name,
        image,
        price,
      };
      axiosSecure.post("/cart", cartItem).then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${name} Added To Your Cart`,
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
        }
      });
    } else {
      Swal.fire({
        title: "You Are Not Logged In",
        text: "Do You Want To Log In?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Log In!",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push(`/login?from=${encodeURIComponent(pathname)}`);
        }
      });
    }
  };

  return (
    <div className="mt-5 overflow-hidden rounded-2xl border border-black/5 bg-white shadow-xl">
      <figure>
        <img className="h-52 w-full object-cover" src={image} alt="food" />
      </figure>
      <div className="space-y-2 p-4">
        <h2 className="text-lg font-semibold text-brand-dark">{name}</h2>
        <p className="text-sm text-brand-muted">Price: ${price}</p>
        <p className="line-clamp-3 text-sm text-brand-muted">{recipe}</p>
        <div className="mt-3">
          <button
            type="button"
            onClick={handleAddToCart}
            className="mx-auto block rounded-lg bg-brand-primary px-4 py-2 text-sm font-semibold text-white"
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
}
