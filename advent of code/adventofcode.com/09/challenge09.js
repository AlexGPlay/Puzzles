const fs = require("fs");

const lines = fs
  .readFileSync("./advent of code/adventofcode.com/09/input.txt")
  .toString()
  .split("\n")
  .map((line) =>
    line
      .trim()
      .split("")
      .map((elem) => parseInt(elem))
  );

/**
 * Part 1
 */
const riskLevels = [];

for (let i = 0; i < lines.length; i++) {
  for (let j = 0; j < lines[i].length; j++) {
    const current = lines[i][j];
    const adjacents = [
      lines[i]?.[j - 1],
      lines[i]?.[j + 1],
      lines[i - 1]?.[j],
      lines[i + 1]?.[j],
    ].filter((elem) => elem !== undefined);

    const isTheLowest = adjacents.every((elem) => elem > current);
    if (isTheLowest) riskLevels.push(current + 1);
  }
}

const addedRiskLevel = riskLevels.reduce((acc, curr) => acc + curr, 0);
console.log(addedRiskLevel); // 506

/**
 * Part 2
 */

const recurseForBasin = (lines, i, j, lastValue, currentBasin, allBasins) => {
  if (lines[i]?.[j] === undefined) return;
  if (currentBasin.some((elem) => elem.i === i && elem.j === j)) return;
  if (allBasins.some((basin) => basin.some((elem) => elem.i === i && elem.j === j))) return;
  if (lines[i][j] !== lastValue + 1) return;
  if (lines[i][j] === 9) return;

  if (i === 0 && j === 0) {
    console.log("xd");
  }

  currentBasin.push({ i, j, height: lines[i][j] });

  const adjacents = [
    [i, j - 1],
    [i, j + 1],
    [i - 1, j],
    [i + 1, j],
  ];

  adjacents.forEach((elem) => {
    recurseForBasin(lines, elem[0], elem[1], lines[i][j], currentBasin, allBasins);
  });
};

const basins = [];

for (let i = 0; i < lines.length; i++) {
  for (let j = 0; j < lines[i].length; j++) {
    const current = lines[i][j];
    const adjacents = [
      lines[i]?.[j - 1],
      lines[i]?.[j + 1],
      lines[i - 1]?.[j],
      lines[i + 1]?.[j],
    ].filter((elem) => elem !== undefined);

    const isTheLowest = adjacents.every((elem) => elem > current);
    if (isTheLowest) {
      const adjacentPositions = [
        [i, j - 1],
        [i, j + 1],
        [i - 1, j],
        [i + 1, j],
      ];

      const currentBasin = [{ i, j, height: current }];

      adjacentPositions.forEach((elem) => {
        recurseForBasin(lines, elem[0], elem[1], current, currentBasin, basins);
      });

      basins.push(currentBasin);
    }
  }
}

const basinsSize = basins.map((elem) => elem.length).sort((a, b) => b - a);
const threeBiggest = basinsSize.slice(0, 3);

let html = "<table>";
for (let i = 0; i < lines.length; i++) {
  let tr = `<tr>${lines[i].map((elem, idx) => {
    const isPartOfBasin = basins.some((basin) =>
      basin.some((elem2) => elem2.i === i && elem2.j === idx)
    );

    const style = isPartOfBasin ? "'font-weight: bold; color: red;'" : "''";

    return `<td style=${style}>${elem}</td>`;
  })}</tr>`;
  html += tr;
}
html += "</table>";

fs.writeFileSync("advent of code/adventofcode.com/09/output.html", html);

console.log(threeBiggest[0] * threeBiggest[1] * threeBiggest[2]);
