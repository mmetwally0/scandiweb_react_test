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
      return price.currency.symbol + (price.amount * count).toFixed(2);
  }
};

//Creates an object in the cart, storing Item info, amount, and the selected attributes
export const createCartItem = (originalItem, selectedAttributes) => {
  const item = { ...originalItem };
  item["amount"] = 1;
  item["selectedAttributes"] = selectedAttributes;
  return item;
};

// Adds the first option of each attribute to the item by default
export const addDefaultAttributes = (originalItem) => {
  const attributes = {};
  originalItem.attributes.forEach((attribute) => {
    attributes[attribute.id] = JSON.stringify(attribute.items[0]);
  });
  return attributes;
};

// Checks if the current attribute is selected
export const isSelectedAttribute = (
  attributeValue,
  attribute,
  selectedAttributes
) => {
  return selectedAttributes[attribute.id] === JSON.stringify(attributeValue);
};

// Creates a dynamic classname for the attribute, marking it as selected or not
export const getClassName = (
  type,
  attributeValue,
  defaultAttributes,
  attribute
) => {
  const selected = isSelectedAttribute(
    attributeValue,
    attribute,
    defaultAttributes
  )
    ? "selected"
    : "";
  return `${type}-attribute ${selected}`;
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
  const cost = cart.reduce(
    (total, currentItem) =>
      total +
      getPriceByCurrency(
        currentItem.prices,
        currency,
        currentItem.amount,
        "number"
      ),
    0
  );

  return currency + cost.toFixed(2);
};

// Checks if an item is in the cart
export const itemInCart = (cart, item) => {
  const cartCopy = [];
  cart.forEach((item) => {
    const newItem = JSON.stringify({ ...item, amount: 0 }); // Here I remove the amount from the Item object, so that I only compare the item and it's selected attributes
    cartCopy.push(newItem);
  });

  return cartCopy.includes(JSON.stringify({ ...item, amount: 0 })); // Using the array method "includes" to return a boolean.
};

// Checks whether the amount is 1, hence being the last of type
export const isLastItem = (cart, item) => {
  const foundItem = cart.find((cartItem) => isItemIdentical(item, cartItem));
  return foundItem.amount === 1;
};

export const isItemIdentical = (item1, item2) => {
  const comparison =
    JSON.stringify(item1.selectedAttributes) ===
    JSON.stringify(item2.selectedAttributes);

  return item1.id === item2.id && comparison;
};
