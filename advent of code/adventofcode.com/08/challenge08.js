const fs = require("fs");

const lines = fs
  .readFileSync("./advent of code/adventofcode.com/08/input.txt")
  .toString()
  .split("\n")
  .map((line) => {
    const [wires, output] = line.trim().split(" | ");
    return { wires: wires.split(" "), output: output.split(" ") };
  });

const neededSegments = [6, 2, 5, 5, 4, 5, 6, 3, 7, 6];

/**
 * Part 1
 */
const step1CountableSegments = [
  neededSegments[1],
  neededSegments[4],
  neededSegments[7],
  neededSegments[8],
];

let counter = 0;
lines.forEach(({ output }) => {
  const countableLines = output.filter((line) => step1CountableSegments.includes(line.length));
  counter += countableLines.length;
});

console.log(counter); // 512

/**
 * Part 2
 */
const numberRepresentation = [
  [1, 2, 3, null, 5, 6, 7],
  [null, null, 3, null, null, 6, null],
  [1, null, 3, 4, 5, null, 7],
  [1, null, 3, 4, null, 6, 7],
  [null, 2, 3, 4, null, 6, null],
  [1, 2, null, 4, null, 6, 7],
  [1, 2, null, 4, 5, 6, 7],
  [1, null, 3, null, null, 6, null],
  [1, 2, 3, 4, 5, 6, 7],
  [1, 2, 3, 4, null, 6, 7],
];

const differentDigitCount = {
  [neededSegments[1]]: 1,
  [neededSegments[4]]: 4,
  [neededSegments[7]]: 7,
  [neededSegments[8]]: 8,
};

const mapFromKnownNumbers = (knownValues) => {
  const orderedKnownNumbers = Object.keys(knownValues).sort(
    (a, b) => numberRepresentation[a].length - numberRepresentation[b].length
  );

  const candidatures = {
    a: [1, 2, 3, 4, 5, 6, 7],
    b: [1, 2, 3, 4, 5, 6, 7],
    c: [1, 2, 3, 4, 5, 6, 7],
    d: [1, 2, 3, 4, 5, 6, 7],
    e: [1, 2, 3, 4, 5, 6, 7],
    f: [1, 2, 3, 4, 5, 6, 7],
    g: [1, 2, 3, 4, 5, 6, 7],
  };

  for (let knownNumber of orderedKnownNumbers) {
    const numberSegments = numberRepresentation[knownNumber];
    const numberWires = knownValues[knownNumber].split("");

    numberWires.forEach((wire) => {
      const currentCandidature = candidatures[wire];
      for (let i = 0; i < currentCandidature.length; i++) {
        if (currentCandidature[i] && !numberSegments[i]) currentCandidature[i] = null;
      }
    });

    Object.keys(candidatures).forEach((wire) => {
      if (numberWires.includes(wire)) return;
      const currentCandidature = candidatures[wire];
      for (let i = 0; i < currentCandidature.length; i++) {
        if (currentCandidature[i] && numberSegments[i]) currentCandidature[i] = null;
      }
    });
  }

  return candidatures;
};

const tryGuess = (currentCandidatures, wires, number) => {
  const numberSegments = numberRepresentation[number];

  const possibleCombinations = wires
    .filter((wire) => wire.length === numberSegments.filter(Boolean).length)
    .filter((combination) => {
      const combinationSegments = combination.split("");
      for (let wire of combinationSegments) {
        const candidateWires = currentCandidatures[wire];
        const hasAny = candidateWires.some((candidate) => numberSegments.includes(candidate));
        if (!hasAny) return false;
      }

      return true;
    });

  console.log("");
};

lines.forEach(({ wires, output }) => {
  const knownMappedData = wires.reduce((acc, line) => {
    const number = differentDigitCount[line.length];
    if (!number || acc[number]) return acc;
    acc[number] = line;
    return acc;
  }, {});

  const candidaturesFromKnownData = mapFromKnownNumbers(knownMappedData);
  tryGuess(candidaturesFromKnownData, wires, 0);
  tryGuess(candidaturesFromKnownData, wires, 2);
  tryGuess(candidaturesFromKnownData, wires, 3);
  tryGuess(candidaturesFromKnownData, wires, 5);
  tryGuess(candidaturesFromKnownData, wires, 6);
  tryGuess(candidaturesFromKnownData, wires, 9);
});
