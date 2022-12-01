const fs = require("fs");

const groups = fs
  .readFileSync("input.txt")
  .toString()
  .split("\n\n")
  .map((entries) => entries.split("\n").map((elem) => Number(elem)));

const summedGroups = groups.map((group) => group.reduce((acc, cur) => acc + cur, 0));
const biggest = Math.max(...summedGroups);

console.log("Part 1", biggest);

// Part 2 from here
summedGroups.sort((a, b) => b - a);
const [top1, top2, top3, ...rest] = summedGroups;
console.log("Part 2", top1 + top2 + top3);
