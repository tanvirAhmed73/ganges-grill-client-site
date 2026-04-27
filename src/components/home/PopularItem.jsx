"use client";

import Link from "next/link";
import Title from "@/components/ui/Title";
import MenuItem from "@/components/menu/MenuItem";
import useMenu from "@/hooks/useMenu";

export default function PopularItem() {
  const [menu] = useMenu();
  const popular = menu.filter((item) => item.category === "popular");
  return (
    <section className="mb-12 mt-56 md:mt-0">
      <Title title="- - - From Our Menu - - -" subtitle="Popular Items" />
      <div className="mx-auto grid w-3/4 gap-10 md:grid-cols-2">
        {popular.map((item) => (
          <MenuItem key={item._id} item={item} />
        ))}
      </div>
      <Link href="/ourMenu">
        <button className="btn btn-outline mx-auto mt-4 block border-0 border-b-4">
          View Full Menu
        </button>
      </Link>
    </section>
  );
}
