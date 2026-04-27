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
    <div>
      <div className="card mt-5 h-[450px] bg-base-100 shadow-xl">
        <figure>
          <img className="h-max w-full" src={image} alt="food" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <p>Price: ${price}</p>
          <p>{recipe}</p>
          <div className="card-actions mt-3 justify-end">
            <button
              type="button"
              onClick={handleAddToCart}
              className="btn btn-primary mx-auto block text-white"
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
