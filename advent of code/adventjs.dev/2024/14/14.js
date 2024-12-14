function minMovesToStables(reindeer, stables) {
  let total = 0;
  const clonedStables = [...stables];

  for (const rein of reindeer) {
    let minimum = Infinity;
    let index = -1;

    for (let i = 0; i < clonedStables.length; i++) {
      const diff = Math.abs(rein - clonedStables[i]);

      if (diff < minimum) {
        minimum = diff;
        index = i;
      }
    }

    total += minimum;
    clonedStables.splice(index, 1);
  }

  return total;
}
