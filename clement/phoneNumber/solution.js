class TrieNode {
  childs = [];

  constructor(value, depth = 0, isWord = false) {
    this.value = value;
    this.depth = depth;
    this.isWord = isWord;
  }

  /**
   * Checks if there is any child of the current node that has the given string, if there is one that node will be
   * returned.
   * @param {string} string String that will be searched between the childs.
   * @returns TrieNode
   */
  childForString(string) {
    return this.childs.find((child) => child.value === string);
  }
}

class Trie {
  head = new TrieNode("");

  /**
   * @param {string} word
   */
  addWord(word) {
    const letters = word.split("");
    let currentNode = this.head;

    for (let i = 0; i < letters.length; i++) {
      let composition = word.slice(0, i + 1);
      let childNode = currentNode.childForString(composition);
      if (!childNode) {
        childNode = new TrieNode(composition, currentNode.depth + 1);
        currentNode.childs.push(childNode);
      }
      currentNode = childNode;
    }

    currentNode.isWord = true;
  }
}

/**
 *
 * Given a phone number and an array of words, return the words that can be contained in the representation
 * of the phone number.
 *
 * @param {string} phoneNumber Can contain the words of the second parameter.
 * @param {string[]} words List of words that can be contained in the phone number.
 *
 * @returns {string[]} The list of the words that are contained in the phone number.
 */
function wordsInPhoneNumber(phoneNumber, words) {
  const tree = new Trie();

  words.forEach((word) => tree.addWord(word));

  const possibleLetters = phoneNumber
    .split("")
    .map((number) => numberToLetters(parseInt(number)).split(""));

  let solution = [];

  for (let i = 0; i < possibleLetters.length; i++) {
    for (let j = i; j < possibleLetters.length; j++) {
      solution = [...solution, ...checkRecursive(tree.head, possibleLetters, j)];
    }
  }

  return [...new Set(solution)];
}

function checkRecursive(node, possibleLetters, position) {
  let foundWords = [];

  for (const letter of possibleLetters[position]) {
    const searchString = node.value + letter;
    const newNode = node.childForString(searchString);
    if (!newNode) continue;
    if (newNode.isWord) foundWords.push(newNode.value);
    if (position + 1 >= possibleLetters.length) continue;
    foundWords = [...foundWords, ...checkRecursive(newNode, possibleLetters, position + 1)];
  }

  return foundWords;
}

function numberToLetters(number) {
  return {
    2: "abc",
    3: "def",
    4: "ghi",
    5: "jkl",
    6: "mno",
    7: "pqrs",
    8: "tuv",
    9: "wxyz",
  }[number];
}

// Code execution

const output = wordsInPhoneNumber("3662277", [
  "foo",
  "bar",
  "baz",
  "foobar",
  "emo",
  "cap",
  "car",
  "cat",
]);
const solution = ["bar", "cap", "car", "emo", "foo", "foobar"];

let valid = true;
for (const word of solution) {
  if (!output.includes(word)) valid = false;
}

console.log("Valid:", valid);
