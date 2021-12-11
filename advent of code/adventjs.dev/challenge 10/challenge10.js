export default function getCoins(change) {
  const coins = [50, 20, 10, 5, 2, 1];
  const result = [0, 0, 0, 0, 0, 0];

  let availableCoins = change;

  while (availableCoins > 0) {
    const validCoin = coins.find((coin) => coin <= availableCoins);
    const validCoinIdx = coins.indexOf(validCoin);

    availableCoins -= validCoin;
    result[validCoinIdx] += 1;
  }

  return result.reverse();
}
