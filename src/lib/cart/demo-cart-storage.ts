/**
 * Client-only cart lines for `gg-demo-*` menu items when the backend has no matching rows yet.
 */

export type DemoCartLine = {
  /** Unique row id for DELETE */
  _id: string;
  foodId: string;
  name: string;
  image: string;
  price: number;
};

const prefix = "gg_demo_cart:";

function key(email: string) {
  return `${prefix}${email.toLowerCase().trim()}`;
}

export function loadDemoCart(email: string | undefined): DemoCartLine[] {
  if (typeof window === "undefined" || !email) return [];
  try {
    const raw = localStorage.getItem(key(email));
    if (!raw) return [];
    const parsed = JSON.parse(raw) as DemoCartLine[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveDemoCart(email: string, lines: DemoCartLine[]) {
  localStorage.setItem(key(email), JSON.stringify(lines));
}

export function addDemoCartLine(
  email: string,
  item: { _id: string; name: string; image: string; price: number }
): DemoCartLine[] {
  const lines = loadDemoCart(email);
  const lineId = `demo-line-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  const row: DemoCartLine = {
    _id: lineId,
    foodId: item._id,
    name: item.name,
    image: item.image,
    price: Number(item.price),
  };
  const next = [...lines, row];
  saveDemoCart(email, next);
  return next;
}

export function removeDemoCartLine(email: string, lineId: string): DemoCartLine[] {
  const lines = loadDemoCart(email).filter((l) => l._id !== lineId);
  saveDemoCart(email, lines);
  return lines;
}

/** Clear all local demo lines after a successful checkout (demo UX). */
export function clearDemoCart(email: string | undefined) {
  if (typeof window === "undefined" || !email) return;
  try {
    localStorage.removeItem(key(email));
  } catch {
    // ignore
  }
}

export function isDemoFoodId(id: string | undefined) {
  return typeof id === "string" && id.startsWith("gg-demo-");
}
