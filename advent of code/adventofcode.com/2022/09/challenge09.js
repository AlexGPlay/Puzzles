const fs = require("fs");

const lines = fs
  .readFileSync("advent of code/adventofcode.com/2022/09/input.txt")
  .toString()
  .split("\n");

const MOVEMENT_TRANSLATION = {
  R: [0, 1],
  L: [0, -1],
  U: [-1, 0],
  D: [1, 0],
};

const distance = (hCoords, tCoords) =>
  Math.sqrt(Math.pow(tCoords[0] - hCoords[0], 2) + Math.pow(tCoords[1] - hCoords[1], 2));

const calculateKnotMovement = (hCoords, tCoords) => {
  if (distance(hCoords, tCoords) < 2) return;
  if (hCoords[1] !== tCoords[1])
    tCoords[1] += (hCoords[1] - tCoords[1]) / Math.abs(hCoords[1] - tCoords[1]);
  if (hCoords[0] !== tCoords[0])
    tCoords[0] += (hCoords[0] - tCoords[0]) / Math.abs(hCoords[0] - tCoords[0]);
};

const calculateMovements = (movement, coords, visitedArray) => {
  const [dir, quantity] = movement.split(" ");
  const translatedDir = MOVEMENT_TRANSLATION[dir];

  for (let i = 0; i < parseInt(quantity); i++) {
    coords[0] = [coords[0][0] + translatedDir[0], coords[0][1] + translatedDir[1]];
    for (let i = 1; i < coords.length; i++) calculateKnotMovement(coords[i - 1], coords[i]);
    visitedArray?.push(coords.at(-1).join(","));
  }
};

function playMovements(lines, size) {
  const visitedCoords = ["0,0"];
  const coords = [[0, 0], ...new Array(size).fill(null).map(() => [0, 0])];
  for (let line of lines) calculateMovements(line, coords, visitedCoords);
  return [...new Set(visitedCoords)].length;
}

console.log(playMovements(lines, 1)); // Part 1
console.log(playMovements(lines, 9)); // Part 2
