export const getPriceByCurrency = (prices, currency) => {
  // Finds the price with the current currency
  const price = prices.filter((price) => price.currency.symbol === currency)[0];

  // Returns a formatted string of the price with the currency
  return `${price.currency.symbol} ${price.amount}`;
};

export const createCartItem = (originalItem, amount, selectedAttributes) => {
  let item = { ...originalItem };
  item["amount"] = amount;
  item["selectedAttributes"] = selectedAttributes;
  return item;
};

export const addDefaultAttributes = (originalItem) => {
  let attributes = [];
  originalItem.attributes.forEach((attribute) => {
    let attr = {};
    attr[attribute.id] = attribute.items[0];

    // Add the first value to the attributes array;
    attributes.push(JSON.stringify(attr));
  });

  return attributes;
};
