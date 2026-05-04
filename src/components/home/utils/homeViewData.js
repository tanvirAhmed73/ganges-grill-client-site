export function buildCuisineResults(restaurants, selectedCuisine, cuisineMap) {
  const keywords = cuisineMap[selectedCuisine] || [];
  const normalizedKeywords = keywords.map((item) => item.toLowerCase());

  const filtered = restaurants.filter((restaurant) => {
    const haystack = `${restaurant.name} ${restaurant.category}`.toLowerCase();
    return normalizedKeywords.some((keyword) => haystack.includes(keyword));
  });

  return filtered.map((restaurant, itemIndex) => ({
    ...restaurant,
    id: `${restaurant.name}-cuisine-${itemIndex}`,
  }));
}

export function buildDealResults(restaurants, selectedDealTitle, dealMap) {
  const keywords = dealMap[selectedDealTitle] || [];
  const normalizedKeywords = keywords.map((item) => item.toLowerCase());

  const filtered = restaurants.filter((restaurant) => {
    if (!normalizedKeywords.length) return true;
    const haystack = `${restaurant.name} ${restaurant.category}`.toLowerCase();
    return normalizedKeywords.some((keyword) => haystack.includes(keyword));
  });

  return filtered.map((restaurant, itemIndex) => ({
    ...restaurant,
    id: `${selectedDealTitle}-${restaurant.name}-deal-${itemIndex}`,
  }));
}
