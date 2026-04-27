"use client";

import { useEffect, useMemo, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import PageAndMenuCover from "@/components/ui/PageAndMenuCover";
import useMenu from "@/hooks/useMenu";
import OrderShared from "@/components/order/OrderShared";

const CATEGORIES = [
  "salad",
  "pizza",
  "soup",
  "dessert",
  "drinks",
  "popular",
  "offered",
];

export default function OrderShopView({ categorySlug }) {
  const [menu] = useMenu();

  const initialIndex = useMemo(() => {
    if (!categorySlug) return 0;
    const i = CATEGORIES.indexOf(categorySlug);
    return i >= 0 ? i : 0;
  }, [categorySlug]);

  const [tabIndex, setTabIndex] = useState(initialIndex);

  useEffect(() => {
    setTabIndex(initialIndex);
  }, [initialIndex]);

  const salad = menu.filter((item) => item.category === "salad");
  const pizza = menu.filter((item) => item.category === "pizza");
  const soup = menu.filter((item) => item.category === "soup");
  const dessert = menu.filter((item) => item.category === "dessert");
  const drinks = menu.filter((item) => item.category === "drinks");
  const popular = menu.filter((item) => item.category === "popular");
  const offered = menu.filter((item) => item.category === "offered");

  return (
    <div>
      <PageAndMenuCover
        img={"https://i.ibb.co/GsFcRwK/banner2.jpg"}
        title={"---OUR SHOP---"}
        description={"Would you like to try a dish?"}
      />

      <div className="mt-5">
        <Tabs
          selectedIndex={tabIndex}
          onSelect={(index) => setTabIndex(index)}
        >
          <TabList className="grid grid-cols-3 justify-center md:grid-cols-4 lg:grid-cols-7">
            <Tab>Salad</Tab>
            <Tab>Pizza</Tab>
            <Tab>Soups</Tab>
            <Tab>Desserts</Tab>
            <Tab>Drinks</Tab>
            <Tab>Popular</Tab>
            <Tab>Offered</Tab>
          </TabList>
          <TabPanel>
            <OrderShared menu={salad} />
          </TabPanel>
          <TabPanel>
            <OrderShared menu={pizza} />
          </TabPanel>
          <TabPanel>
            <OrderShared menu={soup} />
          </TabPanel>
          <TabPanel>
            <OrderShared menu={dessert} />
          </TabPanel>
          <TabPanel>
            <OrderShared menu={drinks} />
          </TabPanel>
          <TabPanel>
            <OrderShared menu={popular} />
          </TabPanel>
          <TabPanel>
            <OrderShared menu={offered} />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}
