/**
 * Needs to remove the islands of ones that are not connected to the borders of the matrix.
 *
 * @param {number[][]} matrix Matrix that consists of 1 and 0.
 * @returns {number[][]} A cleaned representation of the initial matrix.
 */
function removeIslands(matrix) {
  const newMatrix = [];
  let islands = {};

  const externalPositions = getExternalOnes(matrix);
  externalPositions.forEach((position) => {
    if (!islands[position[0]]?.[position[1]]) {
      const newIsland = getIsland(matrix, position);
      Object.keys(newIsland).forEach(
        (key) => (islands[key] = { ...islands[key], ...newIsland[key] })
      );
    }
  });

  for (let i = 0; i < matrix.length; i++) {
    newMatrix[i] = new Array(matrix[i].length).fill(0);
    if (islands[i]) Object.keys(islands[i]).forEach((j) => (newMatrix[i][j] = 1));
  }

  return newMatrix;
}

/**
 * Returns the ones from the external area.
 *
 * @param {number[][]} matrix Matrix that consists of 1 and 0.
 * @returns {number[][]} External positions that have ones.
 */
function getExternalOnes(matrix) {
  const positions = [];

  matrix[0].forEach((value, idx) => value === 1 && positions.push([0, idx])); // Top
  matrix[matrix.length - 1].forEach(
    (value, idx) => value === 1 && positions.push([matrix.length - 1, idx])
  ); // Bottom

  for (let i = 1; i < matrix.length - 1; i++) {
    matrix[i][0] === 1 && positions.push([i, 0]); // Left
    matrix[i][matrix.length - 1] === 1 && positions.push([i, matrix.length - 1]); // Right
  }

  return positions;
}

/**
 * Returns an object that contains all the positions from the island starting on the first element.
 *
 * @param {number[][]} matrix Matrix that consists of 1 and 0.
 * @param {number[]} position i and j coords from a one.
 * @param {Object} island Object that contains all the positions from the island
 *
 */
function getIsland(matrix, position, island = {}) {
  const [i, j] = position;

  if (i < 0 || i >= matrix.length) return island;
  if (j < 0 || j >= matrix[0].length) return island;
  if (matrix[i][j] === 0) return island;

  if (!island[i]) island[i] = {};

  island[i][j] = true;
  if (!island[i + 1]?.[j]) island = getIsland(matrix, [i + 1, j], island);
  if (!island[i - 1]?.[j]) island = getIsland(matrix, [i - 1, j], island);
  if (!island[i]?.[j + 1]) island = getIsland(matrix, [i, j + 1], island);
  if (!island[i]?.[j - 1]) island = getIsland(matrix, [i, j - 1], island);

  return island;
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
