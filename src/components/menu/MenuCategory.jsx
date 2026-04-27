"use client";

import useMenu from "@/hooks/useMenu";
import MenuItem from "@/components/menu/MenuItem";

export default function MenuCategory({ itemCategory }) {
  const [menu] = useMenu();
  const specificDish = menu.filter((item) => item.category === itemCategory);
  return (
    <div>
      <div className="mx-auto mb-5 mt-5 grid w-3/4 gap-10 md:grid-cols-2">
        {specificDish.map((item) => (
          <MenuItem key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
}
