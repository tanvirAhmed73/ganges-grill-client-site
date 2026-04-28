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
        <button className="mx-auto mt-4 block rounded-lg border border-brand-primary px-4 py-2 text-sm font-semibold text-brand-primary transition-colors hover:bg-brand-primary hover:text-white">
          View Full Menu
        </button>
      </Link>
    </section>
  );
}
