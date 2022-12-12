function listPosition(word) {
  return findPositionRec(word) + 1;
}

function findPositionRec(word) {
  if (word.length === 0) return 0;

  const letterOrder = Array.from(new Set(word.split("").sort()));

  const index = letterOrder.findIndex((elem) => elem === word[0]);
  let permutationsInFront = 0;

  for (let i = 0; i < index; i++) {
    const wordWithoutLetter = word.replace(letterOrder[i], "");
    permutationsInFront += countPermutations(wordWithoutLetter);
  }

  return permutationsInFront + findPositionRec(word.substring(1, word.length));
}

function countPermutations(word) {
  return factorial(word.length) / countRepeated(word);
}

function factorial(number) {
  let result = 1;
  for (let i = number; i > 1; i--) result *= i;
  return result;
}

function countRepeated(word) {
  const array = word.split("");
  let countDict = {};

  array.forEach((element) => {
    if (element in countDict) {
      countDict[element]++;
    } else {
      countDict[element] = 1;
    }
  });

  return Object.values(countDict).reduce((acc, element) => acc * factorial(element), 1);
}
