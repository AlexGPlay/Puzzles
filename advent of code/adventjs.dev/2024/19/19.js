/**
 * @param {number} weight - Total weight of the gifts
 * @returns {string} - Stacked boxes represented as ASCII art
 */
function distributeWeight(weight) {
  const boxRepresentations = {
    1: [" _ ", "|_|"],
    2: [" ___ ", "|___|"],
    5: [" _____ ", "|     |", "|_____|"],
    10: [" _________ ", "|         |", "|_________|"],
  };

  let pendingWeight = weight;
  const neededBoxes = [];
  while (pendingWeight > 0) {
    const validBoxes = Object.keys(boxRepresentations).filter(
      (boxWeight) => Number(boxWeight) <= pendingWeight
    );
    const boxWeight = Math.max(...validBoxes);
    neededBoxes.push(boxWeight);
    pendingWeight -= boxWeight;
  }

  const stack = [];
  for (const box of neededBoxes.reverse()) {
    const currentBottom = stack.at(-1) || "";
    const boxRepresentation = boxRepresentations[box];
    stack[stack.length - 1] = (
      currentBottom + boxRepresentation[0].slice(currentBottom.length)
    ).trim();
    const remainingHeight = stack.length ? 1 : 0;
    stack.push(...boxRepresentation.slice(remainingHeight));
  }

  return stack.join("\n");
}
