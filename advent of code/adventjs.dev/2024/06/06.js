function inBox(box) {
  if (!box.join("").includes("*")) return false;
  const firstAndLast = [...box[0], ...box.at(-1)];
  if (firstAndLast.includes("*")) return false;

  for (let i = 1; i < box.length - 1; i++) {
    const firstAndLastCols = box[i][0] + box[i].at(-1);
    if (firstAndLastCols.includes("*")) return false;
  }
  return true;
}
