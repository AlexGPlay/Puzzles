const fs = require("fs");

const parseInput = (file) =>
  fs
    .readFileSync(file)
    .toString()
    .split("\n\n")
    .map((pair) => pair.split("\n").map((part) => eval(part)));

const parseInputWithoutPairs = (file) =>
  fs
    .readFileSync(file)
    .toString()
    .split("\n")
    .filter(Boolean)
    .map((part) => eval(part));

const compareIntegers = (int1, int2) => {
  return int2 - int1;
};

const compareArrays = (arr1, arr2) => {
  let tmpArray1 = [...arr1];
  let tmpArray2 = [...arr2];

  while (true) {
    let [int1] = tmpArray1.splice(0, 1);
    let [int2] = tmpArray2.splice(0, 1);
    if (int1 === undefined && int2 === undefined) return 0;
    if (int1 === undefined) return 1;
    if (int2 === undefined) return -1;
    const comparison = compareValues(int1, int2);
    if (comparison === 0) continue;
    return comparison;
  }
};

const compareValues = (elem1, elem2) => {
  if (typeof elem1 === "number" && typeof elem2 === "number")
    return compareIntegers(elem1, elem2);
  return compareArrays(
    Array.isArray(elem1) ? elem1 : [elem1],
    Array.isArray(elem2) ? elem2 : [elem2]
  );
};

const comparePairs = (input) => {
  let result = 0;

  const pairs = parseInput(input);
  for (let i = 0; i < pairs.length; i++) {
    const pairComparison = compareValues(pairs[i][0], pairs[i][1]);
    if (pairComparison > 0) result += i + 1;
  }

  return result;
};

const sortPairs = (input) => {
  const pairs = parseInputWithoutPairs(input);
  const divider1 = [[2]];
  const divider2 = [[6]];

  pairs.push(divider1);
  pairs.push(divider2);
  pairs.sort((pair1, pair2) => -compareValues(pair1, pair2));

  return (pairs.indexOf(divider1) + 1) * (pairs.indexOf(divider2) + 1);
};

console.log(comparePairs("input.txt")); // 5292
console.log(sortPairs("input.txt")); // 23868
