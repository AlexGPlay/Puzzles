export default function maxProfit(prices) {
  let maxProfit = -1;

  for (let i = 0; i < prices.length; i++) {
    const otherPrices = prices.slice(i + 1);
    const maxPrice = Math.max(...otherPrices);
    const profit = maxPrice - prices[i];
    if (profit && profit > maxProfit) {
      maxProfit = profit;
    }
  }

  return maxProfit;
}
