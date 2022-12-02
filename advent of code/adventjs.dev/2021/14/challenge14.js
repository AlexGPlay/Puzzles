export default function missingReindeer(ids) {
  const sortedIds = ids.sort((a, b) => a - b);
  for (let i = 0; i < sortedIds.length; i++) {
    if (sortedIds[i] !== i) return sortedIds[i] - 1;
  }

  return sortedIds[sortedIds.length - 1] + 1;
}
