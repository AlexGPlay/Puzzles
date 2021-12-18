export default function sumPairs(numbers, result) {
  const dictionary = {};
  numbers.forEach((number) =>
    dictionary[number] ? (dictionary[number] += 1) : (dictionary[number] = 1)
  );

  for (let number of numbers) {
    const complement = result - number;
    const pairCount = dictionary[complement];

    if (!pairCount) continue;
    if (number === complement && pairCount < 2) continue;

    return [number, complement];
  }

  return null;
}
