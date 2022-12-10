function getGiftsToRefill(a1, a2, a3) {
  const onlyA1 = a1.filter((x) => !a2.includes(x)).filter((x) => !a3.includes(x));
  const onlyA2 = a2.filter((x) => !a1.includes(x)).filter((x) => !a3.includes(x));
  const onlyA3 = a3.filter((x) => !a1.includes(x)).filter((x) => !a2.includes(x));
  return [...new Set([...onlyA1, ...onlyA2, ...onlyA3])];
}
