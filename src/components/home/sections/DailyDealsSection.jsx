import Image from "next/image";
import SectionTitle from "@/components/home/sections/SectionTitle";

export default function DailyDealsSection({ dailyDeals, onDealSelect }) {
  return (
    <section>
      <SectionTitle title="Your daily deals" />
      <div className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-1">
        {dailyDeals.map((deal) => (
          <button
            key={deal.title}
            type="button"
            onClick={() => onDealSelect(deal.title)}
            className={`min-w-[240px] shrink-0 overflow-hidden rounded-2xl bg-gradient-to-r ${deal.bgClass} p-4 text-white shadow-sm sm:min-w-[280px]`}
          >
            <div className="grid grid-cols-[1fr_72px] items-center gap-3 sm:grid-cols-[1fr_80px]">
              <div>
                <h3 className="text-base font-semibold sm:text-lg">{deal.title}</h3>
                <p className="text-xs text-white/90 sm:text-sm">{deal.subtitle}</p>
              </div>
              <Image
                src={deal.image}
                alt={deal.title}
                width={80}
                height={80}
                className="h-16 w-16 rounded-full object-cover ring-2 ring-white/60 sm:h-20 sm:w-20"
                loading="lazy"
              />
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
