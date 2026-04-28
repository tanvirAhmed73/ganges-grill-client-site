import RestaurantCard from "@/components/home/sections/RestaurantCard";
import SectionTitle from "@/components/home/sections/SectionTitle";

export default function RestaurantRow({ title, data, serviceMode = "delivery" }) {
  return (
    <section>
      <SectionTitle title={title} />
      <div className="grid grid-flow-col auto-cols-[78%] gap-3 overflow-x-auto pb-1 sm:auto-cols-[45%] lg:grid-flow-row lg:grid-cols-4 lg:overflow-visible">
        {data.map((restaurant, index) => (
          <RestaurantCard
            key={`${title}-${restaurant.name}`}
            restaurant={restaurant}
            serviceMode={serviceMode}
            listIndex={index}
          />
        ))}
      </div>
    </section>
  );
}
