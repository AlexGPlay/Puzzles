function checkPart(part) {
  const isPalindrome = (word) => word === word.split("").reverse().join("");
  if (isPalindrome(part)) return true;
  for (let i = 0; i < part.length; i++) {
    const partArray = part.split("");
    partArray.splice(i, 1);
    if (isPalindrome(partArray.join(""))) return true;
  }

  return false;
}
