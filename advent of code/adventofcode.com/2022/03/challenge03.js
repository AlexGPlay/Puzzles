const fs = require("fs");

const rucksacks = fs.readFileSync("input.txt").toString().split("\n");
const letters = [
  ...new Array("z".charCodeAt(0) - "a".charCodeAt(0) + 1)
    .fill(0)
    .map((_, idx) => String.fromCharCode(idx + "a".charCodeAt(0))),
  ...new Array("Z".charCodeAt(0) - "A".charCodeAt(0) + 1)
    .fill(0)
    .map((_, idx) => String.fromCharCode(idx + "A".charCodeAt(0))),
];

// First part

console.log(
  rucksacks
    .map((rucksack) => {
      const [firsCompartment, secondCompartment] = [
        rucksack.slice(0, rucksack.length / 2).split(""),
        rucksack.slice(rucksack.length / 2).split(""),
      ];

      const commonLetters = [
        ...new Set(firsCompartment.filter((value) => secondCompartment.includes(value))),
      ];

      return commonLetters.reduce((acc, letter) => acc + letters.indexOf(letter) + 1, 0);
    })
    .reduce((acc, curr) => acc + curr, 0)
);

// Second part
let res = 0;

for (let i = 0; i < rucksacks.length; i += 3) {
  const [first, second, third] = rucksacks.slice(i, i + 3).map((a) => a.split(""));

  const commonLetters = [
    ...new Set(first.filter((value) => second.includes(value) && third.includes(value))),
  ];

  res += commonLetters.reduce((acc, letter) => acc + letters.indexOf(letter) + 1, 0);
}

console.log(res);
