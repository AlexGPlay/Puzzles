export default function createXmasTree(height) {
  const neededWidth = height * 2 - 1;
  const center = Math.ceil(neededWidth / 2);

  const tree = [];
  for (let i = 0; i < height; i++) {
    const rowContentWidth = i * 2 + 1;
    const rowContentStart = Math.floor(center - rowContentWidth / 2);
    const rowContentEnd = rowContentStart + rowContentWidth;

    tree.push(
      "_".repeat(rowContentStart) +
        "*".repeat(rowContentWidth) +
        "_".repeat(neededWidth - rowContentEnd)
    );
  }

  const trunkHeight = 2;

  const rowContentStart = Math.floor(center - 1 / 2);
  const rowContentEnd = rowContentStart + 1;

  for (let i = 0; i < trunkHeight; i++)
    tree.push("_".repeat(rowContentStart) + "#" + "_".repeat(neededWidth - rowContentEnd));

  return tree.join("\n");
}
