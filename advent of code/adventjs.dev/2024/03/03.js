function organizeInventory(inventory) {
  const sortedResults = {};
  for (const { category, name, quantity } of inventory) {
    sortedResults[category] ??= {};
    sortedResults[category][name] =
      (sortedResults[category][name] || 0) + quantity;
  }

  return sortedResults;
}
