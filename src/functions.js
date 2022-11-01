export const getPriceByCurrency = (prices, currency) => {
  // Finds the price with the current currency
  const price = prices.filter((price) => price.currency.symbol === currency)[0];

  // Returns a formatted string of the price with the currency
  return `${price.currency.symbol} ${price.amount}`;
};
