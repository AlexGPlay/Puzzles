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

const distance = (hCoords, tCoords) => {
  return Math.sqrt(Math.pow(tCoords[0] - hCoords[0], 2) + Math.pow(tCoords[1] - hCoords[1], 2));
};

const calculateKnotMovement = (hCoords, tCoords) => {
  if (distance(hCoords, tCoords) < 2) return;
  if (hCoords[1] !== tCoords[1])
    tCoords[1] += (hCoords[1] - tCoords[1]) / Math.abs(hCoords[1] - tCoords[1]);
  if (hCoords[0] !== tCoords[0])
    tCoords[0] += (hCoords[0] - tCoords[0]) / Math.abs(hCoords[0] - tCoords[0]);
};

const calculateMovements = (movement, hCoords, tCoords, visitedArray) => {
  const [dir, quantity] = movement.split(" ");
  const translatedDir = MOVEMENT_TRANSLATION[dir];

  for (let i = 0; i < parseInt(quantity); i++) {
    hCoords[0] += translatedDir[0];
    hCoords[1] += translatedDir[1];

    let head = hCoords;
    for (let i = 0; i < tCoords.length; i++) {
      calculateKnotMovement(head, tCoords[i]);
      head = tCoords[i];
    }
    visitedArray?.push(tCoords.at(-1).join(","));
  }
};

// Part 1
const tCoords = [[0, 0]];
const hCoords = [0, 0];

const visitedCoords = ["0,0"];

for (let line of lines) calculateMovements(line, hCoords, tCoords, visitedCoords);
console.log([...new Set(visitedCoords)].length);

// Part 2

const visitedCoords2 = ["0,0"];
const tCoords2 = new Array(9).fill(null).map(() => [0, 0]);
const hCoords2 = [0, 0];

for (let line of lines) calculateMovements(line, hCoords2, tCoords2, visitedCoords2);
console.log([...new Set(visitedCoords2)].length);
