function organizeShoes(shoes) {
  const toFindPairs = { I: "R", R: "I" };

  const foundShoes = {};
  const pairs = [];

  for (const { type, size } of shoes) {
    const toFind = `${size}-${toFindPairs[type]}`;
    if (foundShoes[toFind]) {
      foundShoes[toFind] -= 1;
      pairs.push(size);
      continue;
    }

    const key = `${size}-${type}`;
    foundShoes[key] = (foundShoes[key] ?? 0) + 1;
  }

  return pairs;
}
