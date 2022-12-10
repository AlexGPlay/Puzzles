function getMaxGifts(giftsCities, maxGifts, maxCities) {
  function combination(array, n) {
    if (array.length < n) {
      return [];
    }
    let recur = (array, n) => {
      if (--n < 0) {
        return [[]];
      }
      const combinations = [];
      array = [...array];
      while (array.length - n) {
        let value = array.shift();
        recur(array, n).forEach((combination) => {
          combination.unshift(value);
          combinations.push(combination);
        });
      }
      return combinations;
    };
    return recur(array, n);
  }

  const combinations = [];
  for (let i = 1; i <= maxCities; i++) {
    combinations.push(...combination(giftsCities, i));
  }
  const sums = combinations
    .map((combination) => combination.reduce((acc, curr) => acc + curr, 0))
    .filter((sum) => sum <= maxGifts);

  return sums.length === 0 ? 0 : Math.max(...sums);
}
