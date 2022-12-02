export default function countDecorations(bigTree) {
  let value = bigTree.value;
  if (bigTree.right) value += countDecorations(bigTree.right);
  if (bigTree.left) value += countDecorations(bigTree.left);

  return value;
}
