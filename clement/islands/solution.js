/**
 * Needs to remove the islands of ones that are not connected to the borders of the matrix.
 *
 * @param {number[][]} matrix Matrix that consists of 1 and 0.
 * @returns {number[][]} A cleaned representation of the initial matrix.
 */
function removeIslands(matrix) {
  const newMatrix = [];
  for (let i = 0; i < matrix.length; i++) newMatrix.push(new Array(matrix[0].length).fill(0));

  matrix[0].forEach(
    // Top
    (value, idx) =>
      value === 1 && newMatrix[0][idx] === 0 && fillIsland(matrix, [0, idx], newMatrix)
  );
  matrix[matrix.length - 1].forEach(
    // Bottom
    (value, idx) =>
      value === 1 &&
      newMatrix[matrix.length - 1][idx] === 0 &&
      fillIsland(matrix, [matrix.length - 1, idx], newMatrix)
  );

  for (let i = 1; i < matrix.length - 1; i++) {
    matrix[i][0] === 1 && newMatrix[i][0] === 0 && fillIsland(matrix, [i, 0], newMatrix); // Left
    matrix[i][matrix.length - 1] === 1 &&
      newMatrix[i][matrix.length - 1] === 0 &&
      fillIsland(matrix, [i, matrix.length - 1], newMatrix); // Right
  }

  return newMatrix;
}

function fillIsland(matrix, position, newMatrix) {
  const [i, j] = position;

  if (i < 0 || i >= matrix.length) return;
  if (j < 0 || j >= matrix[0].length) return;
  if (matrix[i][j] === 0) return;

  newMatrix[i][j] = 1;
  if (newMatrix[i + 1]?.[j] === 0) fillIsland(matrix, [i + 1, j], newMatrix);
  if (newMatrix[i - 1]?.[j] === 0) fillIsland(matrix, [i - 1, j], newMatrix);
  if (newMatrix[i]?.[j + 1] === 0) fillIsland(matrix, [i, j + 1], newMatrix);
  if (newMatrix[i]?.[j - 1] === 0) fillIsland(matrix, [i, j - 1], newMatrix);
}

//
// Code Execution
//

const sampleEntry = [
  [1, 0, 0, 0, 0, 0],
  [0, 1, 0, 1, 1, 1],
  [0, 0, 1, 0, 1, 0],
  [1, 1, 0, 0, 1, 0],
  [1, 0, 1, 1, 0, 0],
  [1, 0, 0, 0, 0, 1],
];

const sampleOutput = [
  [1, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 1],
  [0, 0, 0, 0, 1, 0],
  [1, 1, 0, 0, 1, 0],
  [1, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 1],
];

const solution = removeIslands(sampleEntry);

let valid = true;
for (let i = 0; i < sampleOutput.length; i++) {
  for (let j = 0; j < sampleOutput[0].length; j++) {
    if (solution[i][j] !== sampleOutput[i][j]) valid = false;
  }
}

console.log("Valid:", valid);
