/**
 * Deterministic pick-up prep time + walking distance for demo listings.
 */
export function getPickupLine(restaurant, index = 0) {
  const name = restaurant?.name || "";
  const nameLen = name.length;
  const minutes = 8 + ((nameLen + index * 3) % 12);
  const meters = 110 + ((nameLen * 17 + index * 41) % 480);
  return `${minutes} min · ${meters} m away`;
}
