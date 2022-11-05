export const getPriceByCurrency = (
  prices,
  currency,
  count = 1,
  returnType = "text"
) => {
  // Finds the price with the current currency
  const price = prices.filter((price) => price.currency.symbol === currency)[0];

  switch (returnType) {
    case "number":
      // Returns only the price
      return price.amount * count;
    default:
      // Returns a formatted string of the price with the currency
      return `${price.currency.symbol} ${(price.amount * count).toFixed(2)}`;
  }
};

//Creates an object in the cart, storing Item info, amount, and the selected attributes
export const createCartItem = (originalItem, amount, selectedAttributes) => {
  let item = { ...originalItem };
  item["amount"] = amount;
  item["selectedAttributes"] = selectedAttributes;
  return item;
};

// Adds the first option of each attribute to the item by default
export const addDefaultAttributes = (originalItem) => {
  let attributes = [];
  originalItem.attributes.forEach((attribute) => {
    attributes.push(JSON.stringify(attribute.items[0]));
  });
  return attributes;
};

// Checks if the current attribute is selected
export const isSelectedAttribute = (att, selectedAttributes) => {
  return selectedAttributes.includes(JSON.stringify(att));
};

// Creates a dynamic classname for the attribute, marking it as selected or not
export const getClassName = (type, att, defaultAttributes) => {
  const selected = isSelectedAttribute(att, defaultAttributes)
    ? " " + "selected"
    : "";
  return `${type}-attribute` + selected;
};

// Loops through all items in the cart and gets their total amount
export const getCartTotalItems = (cart) => {
  let count = 0;
  cart.map((item) => (count += item.amount));
  return count;
};

// Loops through all items in the cart and gets their total cost.
// Returns formatted string with the currency symbol
export const getCartTotalCost = (cart, currency) => {
  let cost = 0;
  cart.forEach((item) => {
    cost += getPriceByCurrency(item.prices, currency, item.amount, "number");
  });
  return `${currency} ${cost.toFixed(2)}`;
};

// Checks if an item is in the cart
export const itemInCart = (cart, item) => {
  let cartCopy = [];
  cart.forEach((item) => {
    let newItem = { ...item, amount: 0 }; // Here I remove the amount from the Item object, so that I only compare the item and it's selected attributes
    newItem = JSON.stringify(newItem);
    cartCopy.push(newItem);
  });

  return cartCopy.includes(JSON.stringify({ ...item, amount: 0 })); // Using the array method "includes" to return a boolean.
};

// Checks whether the amount is 1, hence being the last of type
export const isLastItem = (cart, item) => {
  const foundItem = cart.find((cartItem) => cartItem.id === item.id);
  return foundItem.amount === 1;
};
