import { SHOP_CATEGORIES } from "@/lib/shop/categories";

export type GroupedMenuSection = {
  id: string;
  label: string;
  items: Array<{
    _id: string;
    name: string;
    image: string;
    price: number;
    recipe?: string;
    category?: string;
  }>;
};

function labelForCategory(id: string): string {
  const found = SHOP_CATEGORIES.find((c) => c.id === id);
  if (found) return found.label;
  return id.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Group flat menu items by `category`, order sections using SHOP_CATEGORIES, then extras as "Other". */
export function groupMenuByCategory<T extends { category?: string }>(
  items: T[]
): GroupedMenuSection[] {
  const map = new Map<string, T[]>();
  for (const item of items) {
    const key = (item.category || "other").toLowerCase();
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(item);
  }

  const out: GroupedMenuSection[] = [];
  const used = new Set<string>();

  for (const { id, label } of SHOP_CATEGORIES) {
    const bucket = map.get(id);
    if (bucket?.length) {
      out.push({
        id,
        label,
        items: bucket as unknown as GroupedMenuSection["items"],
      });
      used.add(id);
    }
  }

  for (const [id, bucket] of map) {
    if (!used.has(id) && bucket.length) {
      out.push({
        id,
        label: labelForCategory(id),
        items: bucket as unknown as GroupedMenuSection["items"],
      });
    }
  }

  return out;
}
