import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-brand-secondary/75 via-rose-100 to-pink-100 p-5 shadow-sm sm:p-7">
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
