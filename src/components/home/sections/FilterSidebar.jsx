import { FiMapPin, FiSliders } from "react-icons/fi";
import { MdOutlinePhoneIphone } from "react-icons/md";

export default function FilterSidebar({ serviceMode = "delivery" }) {
  const isPickup = serviceMode === "pickup";

  const sortOptions = isPickup
    ? ["Relevance", "Top rated", "Distance"]
    : ["Relevance", "Fastest delivery", "Distance", "Top rated"];

  const quickTags = isPickup
    ? ["Accepts vouchers", "Deals", "Top rated", "Open now"]
    : ["Free delivery", "Discounts", "Top rated", "Pick-up"];

  return (
    <aside className="hidden space-y-4 lg:sticky lg:top-28 lg:block lg:h-fit">
      <section className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm">
        <div className="mb-4 flex items-center gap-2 text-brand-dark">
          <FiSliders className="text-lg text-brand-primary" />
          <h2 className="text-lg font-semibold">Filters</h2>
        </div>

        <div className="space-y-5">
          <section>
            <h3 className="mb-2 text-sm font-semibold text-brand-dark">Sort by</h3>
            <div className="space-y-2 text-sm text-brand-muted">
              {sortOptions.map((option) => (
                <label key={option} className="flex items-center gap-2.5">
                  <input
                    type="radio"
                    name="sort"
                    className="h-4 w-4 border-brand-secondary text-brand-primary focus:ring-brand-primary"
                    defaultChecked={option === "Relevance"}
                  />
                  {option}
                </label>
              ))}
            </div>
          </section>

          <section>
            <h3 className="mb-2 text-sm font-semibold text-brand-dark">Quick filters</h3>
            <div className="flex flex-wrap gap-2">
              {quickTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  className="rounded-full border border-brand-secondary/80 px-3 py-1.5 text-xs font-medium text-brand-muted transition-colors hover:border-brand-primary hover:text-brand-dark"
                >
                  {tag}
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-xl bg-brand-secondary/20 p-3">
            <h3 className="text-sm font-semibold text-brand-dark">
              {isPickup ? "Pick-up point" : "Delivery address"}
            </h3>
            <p className="mt-1 flex items-start gap-2 text-sm text-brand-muted">
              <FiMapPin className="mt-0.5 shrink-0 text-brand-primary" />
              {isPickup
                ? "Near Gulshan Avenue, Dhaka — we’ll show places you can walk to."
                : "New address, Gulshan Avenue, Dhaka"}
            </p>
          </section>
        </div>
      </section>

      <section className="rounded-2xl bg-[#2c2c2c] p-4 text-white shadow-sm">
        <p className="text-xs uppercase tracking-wide text-white/70">Unlock more in app</p>
        <h3 className="mt-1 text-sm font-semibold leading-snug">
          Download now for better offers daily
        </h3>
        <button
          type="button"
          className="mt-3 inline-flex items-center gap-2 rounded-lg bg-white/15 px-3 py-2 text-xs font-medium"
        >
          <MdOutlinePhoneIphone className="text-sm" />
          Download app
        </button>
      </section>
    </aside>
  );
}
