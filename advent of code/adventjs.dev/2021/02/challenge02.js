export default function listGifts(letter) {
  return letter.split(" ").reduce((acc, word) => {
    const parsedWord = word.trim();
    if (!parsedWord || parsedWord.startsWith("_")) return acc;
    return { ...acc, [parsedWord]: acc[parsedWord] + 1 || 1 };
  }, {});
}
