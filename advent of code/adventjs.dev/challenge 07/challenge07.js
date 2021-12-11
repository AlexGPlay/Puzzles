export default function contains(store, product) {
  for (let value of Object.values(store)) {
    if (typeof value !== "object" && value === product) return true;
    else if (typeof value === "object") {
      const isValid = contains(value, product);
      if (isValid) return true;
    }
  }

  return false;
}
