function distributeGifts(packOfGifts, reindeers) {
  return Math.floor(
    reindeers.reduce((acc, curr) => acc + curr.length * 2, 0) /
      packOfGifts.reduce((acc, curr) => acc + curr.length, 0)
  );
}
