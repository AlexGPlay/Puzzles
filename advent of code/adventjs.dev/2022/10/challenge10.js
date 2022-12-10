function checkJump(heights) {
  const directions = [];

  for (let i = 1; i < heights.length; i++) {
    if (heights[i] > heights[i - 1]) {
      if (directions.at(-1) && directions.at(-1) === "down") return false;
      directions.push("up");
    } else if (heights[i] < heights[i - 1]) {
      directions.push("down");
    }
  }

  return [...new Set(directions)].length === 2;
}
