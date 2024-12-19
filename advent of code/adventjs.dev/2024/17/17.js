/**
 * @param {boolean[][]} grid
 * @returns {number[][]}
 */
function detectBombs(grid) {
  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  const result = Array.from({ length: grid.length }, () =>
    Array(grid[0].length).fill(0)
  );

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j]) {
        for (const direction of directions) {
          const newI = i + direction[0];
          const newJ = j + direction[1];
          if (
            newI >= 0 &&
            newI < grid.length &&
            newJ >= 0 &&
            newJ < grid[0].length
          ) {
            result[newI][newJ]++;
          }
        }
      }
    }
  }

  return result;
}
