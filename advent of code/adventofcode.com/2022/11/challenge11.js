const fs = require("fs");

const monkeys = fs
  .readFileSync("input.txt")
  .toString()
  .split("\n\n")
  .map((monkeyData) => {
    const [_, items, operation, test, testTrue, testFalse] = monkeyData.split("\n");
    return {
      items: items.split(":")[1].split(",").map(Number),
      operation: (currentData) => eval(operation.split("=")[1].replaceAll("old", currentData)),
      test: (worryLevel) => worryLevel % Number(test.match(/\d+/)[0]) === 0,
      testNumber: Number(test.match(/\d+/)[0]),
      onTestTrue: Number(testTrue.match(/\d+/)[0]),
      onTestFalse: Number(testFalse.match(/\d+/)[0]),
      inspectedItems: 0,
    };
  });

const gcd = (a, b) => (a ? gcd(b % a, a) : b);
const lcm = (a, b) => (a * b) / gcd(a, b);

function play(rounds, monkeys, worryFn) {
  for (let i = 0; i < rounds; i++) {
    for (let monkey of monkeys) {
      for (let item of [...monkey.items]) {
        monkey.inspectedItems += 1;
        let worryLevel = monkey.operation(item);
        worryLevel = worryFn(worryLevel);
        const nextMonkey = monkey.test(worryLevel) ? monkey.onTestTrue : monkey.onTestFalse;
        monkey.items.splice(0, 1);
        monkeys[nextMonkey].items.push(worryLevel);
      }
    }
  }

  const sortedInspectedItems = monkeys.map((monkey) => monkey.inspectedItems).sort((a, b) => b - a);
  return sortedInspectedItems[0] * sortedInspectedItems[1];
}

// Part 1
const PART_1_ROUNDS = 20;
console.log(
  play(
    PART_1_ROUNDS,
    monkeys.map((monkey) => ({ ...monkey, items: [...monkey.items] })),
    (worryLevel) => Math.floor(worryLevel / 3)
  )
); // 151312

// Part 2
const PART_2_ROUNDS = 10_000;
console.log(
  play(
    PART_2_ROUNDS,
    monkeys.map((monkey) => ({ ...monkey, items: [...monkey.items] })),
    (worryLevel) => worryLevel % monkeys.map((monkey) => monkey.testNumber).reduce(lcm)
  )
);
