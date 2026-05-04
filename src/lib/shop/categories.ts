/** Legacy `/menuItem` categories — aligned with OrderShopView tabs */

export type ShopCategoryId =
  | "salad"
  | "pizza"
  | "soup"
  | "dessert"
  | "drinks"
  | "popular"
  | "offered";

export const SHOP_CATEGORIES: { id: ShopCategoryId; label: string }[] = [
  { id: "salad", label: "Salad" },
  { id: "pizza", label: "Pizza" },
  { id: "soup", label: "Soups" },
  { id: "dessert", label: "Desserts" },
  { id: "drinks", label: "Drinks" },
  { id: "popular", label: "Popular" },
  { id: "offered", label: "Offers" },
];

export const DEFAULT_SHOP_CATEGORY: ShopCategoryId = "popular";

export function isShopCategoryId(s: string | undefined): s is ShopCategoryId {
  return SHOP_CATEGORIES.some((c) => c.id === s);
}
