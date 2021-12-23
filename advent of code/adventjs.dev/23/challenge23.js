export default function canReconfigure(from, to) {
  if (from.length !== to.length) return false;
  const fromMap = {};
  const toMap = {};

  for (let i = 0; i < from.length; i++) {
    const fromChar = from[i];
    const toChar = to[i];

    if (fromChar === toChar) continue;

    if (fromMap[fromChar]) {
      if (fromMap[fromChar] !== toChar) return false;
    }
    if (toMap[toChar]) {
      if (toMap[toChar] !== fromChar) return false;
    }

    fromMap[fromChar] = toChar;
    toMap[toChar] = fromChar;
  }

  return true;
}
