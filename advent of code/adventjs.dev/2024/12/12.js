/** @param {string} ornaments
 * @return {number} - The price of the tree
 */
function calculatePrice(ornaments) {
  const values = {
    "*": 1,
    o: 5,
    "^": 10,
    "#": 50,
    "@": 100,
  };

  let total = 0;
  for (let i = 0; i < ornaments.length; i++) {
    const nextOrnamentValue = values[ornaments[i + 1]] || 0;
    const currentOrnamentValue = values[ornaments[i]];
    if (!currentOrnamentValue) return undefined;

    const diff = currentOrnamentValue + 1 - nextOrnamentValue;
    const sign = Math.sign(diff);

    total += currentOrnamentValue * sign;
  }

  return total;
}
