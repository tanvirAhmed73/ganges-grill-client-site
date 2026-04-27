import Banner from "@/components/home/Banner";
import Category from "@/components/home/Category";
import ContactNumber from "@/components/home/ContactNumber";
import MenuBanner from "@/components/home/MenuBanner";
import PopularItem from "@/components/home/PopularItem";
import SharedBanner from "@/components/ui/SharedBanner";

export default function HomeView() {
  return (
    <div>
      <Banner />
      <Category />
      <SharedBanner
        bannerTitle={"Ganges-Grill"}
        description={
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, libero accusamus laborum deserunt ratione dolor officiis praesentium! Deserunt magni aperiam dolor eius dolore at, nihil iusto ducimus incidunt quibusdam nemo."
        }
      />
      <PopularItem />
      <ContactNumber />
      <MenuBanner />
    </div>
  );
}
