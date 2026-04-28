"use client";

import Link from "next/link";
import PageAndMenuCover from "@/components/ui/PageAndMenuCover";
import Title from "@/components/ui/Title";
import MenuCategory from "@/components/menu/MenuCategory";

export default function OurMenuView() {
  return (
    <div>
      <PageAndMenuCover
        img={"https://i.ibb.co/5vJDpnM/banner3.jpg"}
        title={"Our Menu"}
        description={"WOULD YOU LIKE TO TRY A DISH"}
      />
      <Title title={"---Don't Miss---"} subtitle={"TODAY'S OFFER"} />
      <MenuCategory itemCategory={"popular"} />
      <Link href="/order/popular">
        <button className="mx-auto mb-20 block w-3/4 rounded-lg bg-brand-primary px-4 py-2.5 text-sm font-semibold text-white">
          ORDER YOUR FAVOURITE FOOD
        </button>
      </Link>

      <PageAndMenuCover
        img={"https://i.ibb.co/WDKvBvM/chef-special.jpg"}
        title={"DESSERTS"}
        description={
          "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        }
      />
      <MenuCategory itemCategory={"dessert"} />
      <Link href="/order/dessert">
        <button className="mx-auto mb-20 block w-3/4 rounded-lg bg-brand-primary px-4 py-2.5 text-sm font-semibold text-white">
          ORDER YOUR FAVOURITE FOOD
        </button>
      </Link>

      <PageAndMenuCover
        img={"https://i.ibb.co/WDKvBvM/chef-special.jpg"}
        title={"PIZZA"}
        description={
          "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        }
      />
      <MenuCategory itemCategory={"pizza"} />
      <Link href="/order/pizza">
        <button className="mx-auto mb-20 block w-3/4 rounded-lg bg-brand-primary px-4 py-2.5 text-sm font-semibold text-white">
          ORDER YOUR FAVOURITE FOOD
        </button>
      </Link>

      <PageAndMenuCover
        img={"https://i.ibb.co/WDKvBvM/chef-special.jpg"}
        title={"SALADS"}
        description={
          "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        }
      />
      <MenuCategory itemCategory={"salad"} />
      <Link href="/order/salad">
        <button className="mx-auto mb-20 block w-3/4 rounded-lg bg-brand-primary px-4 py-2.5 text-sm font-semibold text-white">
          ORDER YOUR FAVOURITE FOOD
        </button>
      </Link>

      <PageAndMenuCover
        img={"https://i.ibb.co/WDKvBvM/chef-special.jpg"}
        title={"SOUPS"}
        description={
          "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        }
      />
      <MenuCategory itemCategory={"soup"} />
      <Link href="/order/soup">
        <button className="mx-auto mb-20 block w-3/4 rounded-lg bg-brand-primary px-4 py-2.5 text-sm font-semibold text-white">
          ORDER YOUR FAVOURITE FOOD
        </button>
      </Link>
    </div>
  );
}
