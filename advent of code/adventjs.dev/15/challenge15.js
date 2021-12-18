export default function checkSledJump(heights) {
  if (heights.length < 3) return false;
  const higherPosition = heights.indexOf(Math.max(...heights));
  if (heights.length === higherPosition + 1) return false;

  let status = "ascending";

  for (let i = 1; i < heights.length; i++) {
    if (status === "ascending") if (heights[i] <= heights[i - 1]) return false;
    if (status === "descending") if (heights[i] >= heights[i - 1]) return false;
    if (i === higherPosition) status = "descending";
  }

  return true;
}
