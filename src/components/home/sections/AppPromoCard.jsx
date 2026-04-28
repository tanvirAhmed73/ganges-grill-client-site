import Image from "next/image";
import { RiAppleFill, RiGooglePlayFill } from "react-icons/ri";

export default function AppPromoCard() {
  return (
    <section className="overflow-hidden rounded-3xl bg-[#ffe6ec] p-5 sm:p-6">
      <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_180px] md:items-center">
        <div>
          <h3 className="text-xl font-semibold text-brand-dark sm:text-2xl">
            Unlock exclusive deals and more in our mobile app
          </h3>
          <p className="mt-2 max-w-xl text-sm text-brand-muted sm:text-base">
            Meal for one, full checkout, food and grocery deals; get all in one
            place with faster reorder and app-only discounts.
          </p>
          <div className="mt-4 flex flex-wrap gap-2.5">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg bg-black px-3.5 py-2 text-sm font-medium text-white"
            >
              <RiAppleFill className="text-base" />
              App Store
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg bg-black px-3.5 py-2 text-sm font-medium text-white"
            >
              <RiGooglePlayFill className="text-base" />
              Play Store
            </button>
          </div>
        </div>
        <div className="relative hidden h-36 md:block">
          <Image
            src="https://images.unsplash.com/photo-1586880244406-556ebe35f282?auto=format&fit=crop&w=900&q=80"
            alt="Order food from app"
            fill
            className="rounded-2xl object-cover"
          />
        </div>
      </div>
    </section>
  );
}
