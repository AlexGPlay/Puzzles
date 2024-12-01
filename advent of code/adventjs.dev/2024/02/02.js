function createFrame(names) {
  const longestNameLength = Math.max(...names.map((name) => name.length));

  const result = [];

  // 1 asterisk, 1 space, name length, 1 space, 1 asterisk
  result.push("*".repeat(longestNameLength + 4));
  for (let name of names) {
    const extraSpaces = " ".repeat(longestNameLength - name.length);
    result.push(`* ${name}${extraSpaces} *`);
  }
  result.push("*".repeat(longestNameLength + 4));

  return result.join("\n");
}
