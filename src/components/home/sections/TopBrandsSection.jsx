import SectionTitle from "@/components/home/sections/SectionTitle";

export default function TopBrandsSection({ topBrands }) {
  return (
    <section>
      <SectionTitle
        title="Top brands"
        actionLabel="View all"
        actionHref="/order/popular"
      />
      <div className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-1">
        {topBrands.map((brand) => (
          <button
            key={brand.name}
            type="button"
            className="flex shrink-0 items-center gap-2 rounded-xl border border-black/5 bg-white px-3 py-2.5 text-sm font-medium text-brand-dark shadow-sm transition-colors hover:border-brand-primary hover:text-brand-primary"
          >
            <span
              className={`grid h-8 w-8 place-items-center rounded-full text-[11px] font-bold text-white ${brand.colorClass}`}
            >
              {brand.name.slice(0, 2).toUpperCase()}
            </span>
            {brand.name}
          </button>
        ))}
      </div>
    </section>
  );
}
