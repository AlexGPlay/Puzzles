function selectSleigh(distance, sleighs) {
  const validSleights = sleighs.filter(
    (sleigh) => sleigh.consumption * distance <= 20
  );
  const selectedSleigh = validSleights[validSleights.length - 1];
  return selectedSleigh ? selectedSleigh.name : null;
}
