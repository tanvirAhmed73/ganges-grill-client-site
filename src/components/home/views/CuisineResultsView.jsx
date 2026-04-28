import { FiArrowLeft } from "react-icons/fi";
import RestaurantCard from "@/components/home/sections/RestaurantCard";

export default function CuisineResultsView({
  selectedCuisine,
  results,
  onResetCuisine,
}) {
  return (
    <section className="space-y-5">
      <div className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={onResetCuisine}
            className="inline-flex items-center gap-2 rounded-full border border-brand-secondary/90 px-3 py-2 text-sm font-medium text-brand-muted transition-colors hover:border-brand-primary hover:text-brand-dark"
          >
            <FiArrowLeft />
            Back to home feed
          </button>
          <span className="rounded-full bg-brand-secondary/35 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-dark">
            Cuisine: {selectedCuisine}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold text-brand-dark sm:text-2xl">
              {results.length}+ restaurants for {selectedCuisine}
            </h2>
            <p className="mt-1 text-sm text-brand-muted">
              Explore popular places near your selected delivery location.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {["Relevance", "Fastest", "Rating 4.5+", "Deals"].map((item) => (
              <button
                key={item}
                type="button"
                className="rounded-full border border-brand-secondary/80 px-3 py-1.5 text-xs font-semibold text-brand-muted transition-colors hover:border-brand-primary hover:text-brand-dark"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {results.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            restaurant={restaurant}
            className="h-full [&>div:first-child]:h-32 sm:[&>div:first-child]:h-36"
          />
        ))}
      </div>
    </section>
  );
}
