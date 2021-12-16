export default function decodeNumber(symbols) {
  const symbolValue = {
    ".": 1,
    ",": 5,
    ":": 10,
    ";": 50,
    "!": 100,
  };

  const mappedSymbols = symbols.split("").map((symbol) => symbolValue[symbol] || -1);
  if (mappedSymbols.includes(-1)) return NaN;

  const solution = mappedSymbols.reduce((acc, curr, idx) => {
    let value = curr;
    if (mappedSymbols[idx + 1] && mappedSymbols[idx + 1] > curr) value *= -1;
    return acc + value;
  }, 0);

  return solution;
}
