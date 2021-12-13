export default function wrapGifts(gifts) {
  const wrapLength = gifts[0].length + 2;

  const wrappedGifts = [];
  wrappedGifts.push("*".repeat(wrapLength));
  gifts.forEach((gift) => wrappedGifts.push(`*${gift}*`));
  wrappedGifts.push("*".repeat(wrapLength));

  return wrappedGifts;
}
