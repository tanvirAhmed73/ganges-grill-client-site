import Image from "next/image";
import { FiMapPin } from "react-icons/fi";

export default function HeroSection({ variant = "delivery" }) {
  if (variant === "pickup") {
    return (
      <section className="overflow-hidden rounded-3xl border border-emerald-100/90 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-5 shadow-sm sm:p-7">
        <div className="grid items-center gap-5 md:grid-cols-[minmax(0,1fr)_minmax(160px,260px)]">
          <div>
            <h1 className="max-w-xl text-2xl font-bold leading-tight text-brand-dark sm:text-3xl">
              Explore restaurants near you
            </h1>
            <p className="mt-2 max-w-lg text-sm text-brand-muted sm:text-base">
              Order ahead and pick up when it&apos;s ready — see prep time and walking
              distance for each restaurant.
            </p>
            <button
              type="button"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-brand-dark shadow-md ring-1 ring-black/[0.06] transition hover:bg-neutral-50"
            >
              Show map
              <span className="text-brand-primary" aria-hidden>
                →
              </span>
            </button>
          </div>
          <div className="relative hidden min-h-[140px] md:block">
            <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_at_30%_40%,rgba(16,185,129,0.2),transparent_50%)]" />
            <div className="relative flex h-full min-h-[140px] items-center justify-center rounded-2xl border border-emerald-200/60 bg-white/60 p-4 shadow-inner">
              <div className="grid w-full max-w-[200px] grid-cols-3 gap-2 opacity-90" aria-hidden>
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-md bg-emerald-100/80"
                    style={{ opacity: 0.4 + (i % 3) * 0.2 }}
                  />
                ))}
              </div>
              <FiMapPin className="absolute text-3xl text-brand-primary drop-shadow" aria-hidden />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-brand-secondary/80 via-brand-background to-brand-secondary/50 p-5 shadow-sm sm:p-7">
      <div className="grid items-center gap-5 md:grid-cols-[minmax(0,1fr)_220px]">
        <div>
          <h1 className="max-w-xl text-2xl font-bold leading-tight text-brand-dark sm:text-3xl">
            Sign up for free delivery on your first order
          </h1>
          <p className="mt-2 max-w-lg text-sm text-brand-muted sm:text-base">
            Explore top-rated local favorites with curated deals and faster
            checkout across your nearby restaurants.
          </p>
          <button
            type="button"
            className="mt-4 rounded-full bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Sign up
          </button>
        </div>
        <div className="hidden md:block">
          <Image
            src="https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=900&q=80"
            alt="Featured meal"
            width={440}
            height={300}
            className="h-44 w-full rounded-2xl object-cover"
          />
        </div>
      </div>
    </section>
  );
}
