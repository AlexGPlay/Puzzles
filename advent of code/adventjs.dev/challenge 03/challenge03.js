export default function isValid(letter) {
  const hasInvalidCharacters = /\{|\}|\[|\]/.test(letter);
  if (hasInvalidCharacters) return false;

  const stack = [];
  for (let characterIdx in letter) {
    const character = letter[characterIdx];

    if (character === "(") {
      if (letter[Number(characterIdx) + 1] === ")") return false;
      stack.push("(");
    } else if (character === ")") {
      if (stack.length === 0 || stack[stack.length - 1] !== "(") return false;
      stack.pop();
    }
  }

  return stack.length === 0;
}
