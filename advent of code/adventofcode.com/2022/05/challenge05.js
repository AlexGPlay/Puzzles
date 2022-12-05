const fs = require("fs");

let [stacks, moves] = fs.readFileSync("input.txt").toString().split("\n\n");

stacks = stacks.split("\n");
let processedStacks = [];
for (let i = stacks.length - 2; i >= 0; i--) {
  for (let j = 1; j < stacks[i].length; j += 4) {
    const letter = stacks[i].charAt(j);
    if (!letter || letter === " ") continue;
    if (!processedStacks[(j - 1) / 4]) processedStacks[(j - 1) / 4] = [];
    processedStacks[(j - 1) / 4].push(letter);
  }
}

// Part 1
const ex1 = processedStacks.map((stack) => [...stack]);
moves = moves.split("\n");
for (const move of moves) {
  const { count, from, to } = /move (?<count>\d+) from (?<from>\d+) to (?<to>\d+)/.exec(
    move
  ).groups;
  for (let i = 0; i < parseInt(count); i++) {
    const data = ex1[parseInt(from) - 1].pop();
    ex1[parseInt(to - 1)].push(data);
  }
}

console.log(ex1.map((stack) => stack[stack.length - 1]).join(""));

// Part 2
for (const move of moves) {
  const { count, from, to } = /move (?<count>\d+) from (?<from>\d+) to (?<to>\d+)/.exec(
    move
  ).groups;

  const data = processedStacks[parseInt(from) - 1].splice(
    processedStacks[parseInt(from) - 1].length - parseInt(count)
  );
  processedStacks[parseInt(to - 1)].push(...data);
}

console.log(processedStacks.map((stack) => stack[stack.length - 1]).join(""));
