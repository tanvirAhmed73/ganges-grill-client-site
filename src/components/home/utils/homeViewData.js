export function buildCuisineResults(restaurants, selectedCuisine, cuisineMap) {
  const keywords = cuisineMap[selectedCuisine] || [];
  const normalizedKeywords = keywords.map((item) => item.toLowerCase());

  const filtered = restaurants.filter((restaurant) => {
    const haystack = `${restaurant.name} ${restaurant.category}`.toLowerCase();
    return normalizedKeywords.some((keyword) => haystack.includes(keyword));
  });

  const base = filtered.length > 0 ? filtered : restaurants;

  return Array.from({ length: 4 }).flatMap((_, index) =>
    base.map((restaurant, itemIndex) => ({
      ...restaurant,
      id: `${restaurant.name}-${index}-${itemIndex}`,
    })),
  );
}

export function buildDealResults(restaurants, selectedDealTitle, dealMap) {
  const keywords = dealMap[selectedDealTitle] || [];
  const normalizedKeywords = keywords.map((item) => item.toLowerCase());

  const filtered = restaurants.filter((restaurant) => {
    if (!normalizedKeywords.length) return true;
    const haystack = `${restaurant.name} ${restaurant.category}`.toLowerCase();
    return normalizedKeywords.some((keyword) => haystack.includes(keyword));
  });

  const base = filtered.length > 0 ? filtered : restaurants;

  return Array.from({ length: 7 }).flatMap((_, index) =>
    base.map((restaurant, itemIndex) => ({
      ...restaurant,
      id: `${selectedDealTitle}-${restaurant.name}-${index}-${itemIndex}`,
    })),
  );
}
