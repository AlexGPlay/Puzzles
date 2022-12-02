// Solution with strings
function wrapping(gifts) {
  return gifts.map(
    (gift) => `${"*".repeat(gift.length + 2)}\n*${gift}*\n${"*".repeat(gift.length + 2)}`
  );
}

// Solution with array
function wrapping(gifts) {
  return gifts.map((gift) =>
    ["*".repeat(gift.length + 2), `*${gift}*`, "*".repeat(gift.length + 2)].join("\n")
  );
}
