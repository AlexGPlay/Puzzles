export default function shouldBuyFidelity(times) {
  const ticketPrice = 12;

  const withoutFidelityPrice = times * ticketPrice;

  const accumulatedPrice = new Array(times)
    .fill(ticketPrice)
    .map((ticketPrice, idx) => ticketPrice * Math.pow(0.75, idx + 1))
    .reduce((acc, price) => acc + price, 0);

  const withFidelityPrice = 250 + accumulatedPrice;

  return withoutFidelityPrice > withFidelityPrice;
}
