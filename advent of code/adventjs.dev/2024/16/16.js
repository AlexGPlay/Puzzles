/**
 * @param {string} s
 * @returns {string}
 */
function removeSnow(s) {
  const copy = s.split("");
  let i = 0;

  while (i < copy.length) {
    const currentElement = copy[i];
    const nextElement = copy[i + 1];
    if (currentElement === nextElement) {
      copy.splice(i, 2);
      i = 0;
      continue;
    }
    i++;
  }

  return copy.join("");
}
