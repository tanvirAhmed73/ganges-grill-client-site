"use client";

import Title from "@/components/ui/Title";
import useCart from "@/hooks/useCart";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import Swal from "sweetalert2";

export default function CartPage() {
  const axiosSecure = useAxiosSecure();
  const [cart, refetch] = useCart();
  let totalPrice = 0;
  for (let i = 0; i < cart.length; i++) {
    if (cart[i] && Object.prototype.hasOwnProperty.call(cart[i], "price")) {
      totalPrice += cart[i].price;
    }
  }

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/cart/${id}`).then((res) => {
          if (res.data.deletedCount) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  return (
    <div>
      <Title title={"---My Cart---"} subtitle={"WANNA ADD MORE?"} />

      <div className="mx-auto rounded-2xl bg-white p-4 md:w-3/4">
        <div className="flex justify-around">
          <h1 className="mt-5">TOTAL ORDERS:{cart.length} |</h1>
          <h1 className="mt-5">TOTAL PRICE : {totalPrice} |</h1>
          <button
            type="button"
            className="mt-5 rounded-md bg-amber-500 px-2 py-1 text-xs font-semibold text-white"
          >
            PAY
          </button>
        </div>
        <div>
          {cart.map((item) => (
            <div
              key={item._id}
              className="mx-auto mt-3 flex w-11/12 overflow-hidden rounded-xl border border-black/5 bg-white shadow-sm md:hidden"
            >
              <figure className="w-1/2">
                <img className="h-auto w-full" src={item.image} alt="food" />
              </figure>

              <div className="mx-auto ml-2 flex flex-col justify-center">
                <h2 className="text-xs">{item.name}</h2>
                <p>Price :${item.price}</p>

                <button
                  type="button"
                  onClick={() => handleDelete(item._id)}
                  className="rounded-md bg-red-600 px-2 py-1 text-xs font-semibold text-white"
                >
                  DELETE
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden overflow-x-auto md:block">
          <table className="min-w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-black/10 text-sm text-brand-muted">
                <th className="px-3 py-2">Image</th>
                <th className="px-3 py-2">Name</th>
                <th className="px-3 py-2">Price</th>
                <th className="px-3 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item._id} className="border-b border-black/5">
                  <td className="px-3 py-2">
                    <img src={item.image} alt="" className="h-12 w-12 rounded-lg object-cover" />
                  </td>
                  <td className="px-3 py-2">
                    <div className="font-bold">{item.name}</div>
                  </td>
                  <td className="px-3 py-2">{item.price}</td>
                  <td className="px-3 py-2">
                    <button
                      type="button"
                      onClick={() => handleDelete(item._id)}
                      className="rounded-md bg-red-600 px-2 py-1 text-xs font-semibold text-white"
                    >
                      DELETE
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
