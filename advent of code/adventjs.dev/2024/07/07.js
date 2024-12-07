function fixPackages(packages) {
  const stack = [[]];

  for (const char of packages) {
    if (char === "(") {
      stack.push([]);
    } else if (char === ")") {
      const last = stack.pop();
      const rotate = last.reverse();
      stack[stack.length - 1].push(...rotate);
    } else {
      stack[stack.length - 1].push(char);
    }
  }

  return stack[0].join("");
}
