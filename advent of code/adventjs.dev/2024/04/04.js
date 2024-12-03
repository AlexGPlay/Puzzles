function createXmasTree(height, ornament) {
  const maxLength = height * 2 - 1;

  const tree = [];
  for (let i = 0; i < height; i++) {
    const ornamentLength = i * 2 + 1;
    const fillLength = (maxLength - ornamentLength) / 2;
    const fill = "_".repeat(fillLength);

    tree.push(`${fill}${ornament.repeat(ornamentLength)}${fill}`);
  }

  const fillLength = (maxLength - 1) / 2;
  const fill = "_".repeat(fillLength);
  tree.push(`${fill}#${fill}`);
  tree.push(`${fill}#${fill}`);

  return tree.join("\n");
}
