function createCube(size) {
  const result = [];

  let topView = "\\_\\".repeat(size).replaceAll("\\\\", "\\");
  let bottomView = "/_/".repeat(size).replaceAll("//", "/");

  for (let i = 0; i < size; i++) {
    result.push(" ".repeat(size - 1 - i) + "/" + "\\/".repeat(i) + topView);
  }

  for (let i = 0; i < size; i++) {
    result.push(" ".repeat(i) + "\\" + "/\\".repeat(size - 1 - i) + bottomView);
  }

  return result.join("\n");
}
