import Image from "next/image";
import SectionTitle from "@/components/home/sections/SectionTitle";

export default function CuisinesSection({
  cuisines,
  selectedCuisine,
  onCuisineSelect,
}) {
  return (
    <section>
      <SectionTitle title="Cuisines" actionLabel={selectedCuisine ? "Selected" : "Explore"} />
      <div className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-1">
        {cuisines.map((cuisine) => (
          <button
            key={cuisine.name}
            type="button"
            onClick={() => onCuisineSelect(cuisine.name)}
            className="group shrink-0 text-center"
            aria-pressed={selectedCuisine === cuisine.name}
          >
            <Image
              src={cuisine.image}
              alt={cuisine.name}
              width={90}
              height={90}
              className={`h-20 w-20 rounded-full object-cover ring-2 transition sm:h-24 sm:w-24 ${
                selectedCuisine === cuisine.name
                  ? "ring-brand-primary"
                  : "ring-transparent group-hover:ring-brand-primary"
              }`}
              loading="lazy"
            />
            <span
              className={`mt-2 block text-xs font-medium sm:text-sm ${
                selectedCuisine === cuisine.name
                  ? "text-brand-dark"
                  : "text-brand-muted group-hover:text-brand-dark"
              }`}
            >
              {cuisine.name}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
