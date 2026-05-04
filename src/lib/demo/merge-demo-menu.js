import { DEMO_MENU_ITEMS } from "@/lib/demo/demo-menu-items";

/** Prepends demo dishes; skips API rows that share the same `_id` as a demo item. */
export function mergeDemoMenu(apiItems) {
  const api = Array.isArray(apiItems) ? apiItems : [];
  const apiIds = new Set(api.map((i) => i && i._id).filter(Boolean));
  const demos = DEMO_MENU_ITEMS.filter((d) => !apiIds.has(d._id));
  return [...demos, ...api];
}
