import Image from "next/image";
import { FaWalking } from "react-icons/fa";
import { MdOutlineDeliveryDining, MdOutlineStar } from "react-icons/md";
import { getPickupLine } from "@/components/home/utils/pickupMeta";

export default function RestaurantCard({
  restaurant,
  className = "",
  serviceMode = "delivery",
  listIndex = 0,
}) {
  const isPickup = serviceMode === "pickup";
  const etaLine = isPickup ? getPickupLine(restaurant, listIndex) : restaurant.eta;

  return (
    <article
      className={`overflow-hidden rounded-2xl border border-black/5 bg-white shadow-[0_8px_20px_-16px_rgba(0,0,0,0.45)] ${className}`}
    >
      <div className="relative h-36 overflow-hidden sm:h-40">
        <Image
          src={restaurant.image}
          alt={restaurant.name}
          fill
          className="object-cover transition duration-300 hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="space-y-2 px-3.5 py-3">
        <h3 className="truncate text-[0.95rem] font-semibold text-brand-dark">
          {restaurant.name}
        </h3>
        <p className="truncate text-xs text-brand-muted sm:text-sm">{restaurant.category}</p>
        <div className="flex items-center justify-between gap-2 text-xs text-brand-muted sm:text-sm">
          <span className="inline-flex min-w-0 items-center gap-1">
            {isPickup ? (
              <FaWalking className="shrink-0 text-base text-brand-primary" aria-hidden />
            ) : (
              <MdOutlineDeliveryDining className="shrink-0 text-base" aria-hidden />
            )}
            <span className="truncate">{etaLine}</span>
          </span>
          <span className="inline-flex shrink-0 items-center gap-1 font-medium text-brand-dark">
            <MdOutlineStar className="text-brand-primary" aria-hidden />
            {restaurant.rating}
          </span>
        </div>
      </div>
    </article>
  );
}
