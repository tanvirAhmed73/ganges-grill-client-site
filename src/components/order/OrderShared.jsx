"use client";

import OrderPageCard from "@/components/order/OrderPageCard";

export default function OrderShared({ menu }) {
  return (
    <div className="mx-auto mb-6 mt-6 grid w-3/4 md:grid-cols-2 md:gap-10 lg:grid-cols-3">
      {menu.map((item) => (
        <OrderPageCard key={item._id} item={item} />
      ))}
    </div>
  );
}
