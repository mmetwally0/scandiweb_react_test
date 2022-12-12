import "./App.css";
import NavBar from "./components/NavBar";
import Body from "./components/body";
import React from "react";
import { isLastItem, itemInCart, isItemIdentical } from "./functions";
import Alert from "./components/Alert";

class App extends React.Component {
  constructor(props) {
    super(props);

    // State of the App
    this.state = {
      currency: "$", // Current currency in the app
      category: "all", // Current category
      cart: [], // Stores all the items of the cart
      bodyPage: "category", // Whether to show PDP, Category Page, Cart
      product: {},
      storeState: true, // Save the User's cart browsing state
      showAlert: false,
      alertMessage: "",
    };

    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleChangeProduct = this.handleChangeProduct.bind(this);
    this.handleChangeCart = this.handleChangeCart.bind(this);
    this.handleClearCart = this.handleClearCart.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleOpenCart = this.handleOpenCart.bind(this);
  }

  componentDidMount() {
    // Retrieve the state saved in the browser
    const savedState = localStorage.getItem("APP_STATE"); // String
    const savedStateObject = JSON.parse(savedState); // Object
    const stringifiedState = JSON.stringify(this.state); // String

    // If there is state saved, set the current state to it.
    savedState
      ? savedState !== stringifiedState && this.setState(savedStateObject) // If the saved state doesn't match the current state replace the current state
      : localStorage.setItem("APP_STATE", stringifiedState); // If there is no saved state, save the current state

    this.setState({ showAlert: false }); // On reload, remove any alert notification
  }

  // On component Update, Re-save the state locally
  componentDidUpdate() {
    this.state.storeState
      ? localStorage.setItem("APP_STATE", JSON.stringify(this.state))
      : localStorage.removeItem("APP_STATE");
  }

  // Change the currency of the store
  handleCurrencyChange(currency) {
    this.setState({ currency: currency });
  }

  // Change the current category displayed
  handleCategoryChange(name) {
    this.setState({ category: name, bodyPage: "category" });
  }

  // Handles adding items to cart
  handleAddToCart(item) {
    !itemInCart(this.state.cart, item) // if item is not in the cart
      ? this.setState({ cart: [...this.state.cart, item] }) // Add it
      : this.handleChangeCart(item, "add"); // If item is already in the cart, increment its amount by one
  }

  // Handles removing from cart
  handleRemoveFromCart(item) {
    const cartCopy = this.state.cart.filter(
      (cartItem) => !isItemIdentical(item, cartItem)
    ); // Creates a new cart by removing the item
    this.setState({ cart: cartCopy });
  }

  // Handles changing the amount of item in cart
  handleChangeItemAmount(item, add) {
    // Loop through the cart items, if the specified item is found perform the operation
    const cartCopy = this.state.cart.map((cartItem) =>
      !isItemIdentical(item, cartItem)
        ? cartItem
        : {
            ...cartItem,
            amount: add ? cartItem.amount + 1 : cartItem.amount - 1,
          }
    );
    this.setState({ cart: cartCopy });
  }

  // Checks the amounts of the item, and performs the correct operation
  handleChangeCart(item, action) {
    switch (action) {
      case "add":
        this.handleChangeItemAmount(item, true);
        break;
      default: // Remove item from cart
        isLastItem(this.state.cart, item)
          ? this.handleRemoveFromCart(item)
          : this.handleChangeItemAmount(item, false);
        break;
    }
  }

  // Opens the category page
  handleChangeProduct(product) {
    this.setState({ bodyPage: "pdp", product: product });
  }

  // Opens the Cart Page
  handleOpenCart() {
    this.setState({ bodyPage: "cart" });
  }

  // Deletes all items from cart i.e. checkout
  handleClearCart() {
    this.setState({ cart: [] });
    this.handleAlert("Order Successful ✅");
  }

  handleAlert(message) {
    this.setState({ showAlert: true, alertMessage: message });

    setTimeout(() => {
      this.setState({ showAlert: false });
    }, 3000);
  }

  render() {
    const { currency, category, cart, bodyPage, product } = this.state;
    return (
      // Nav Bar component
      // Body Component
      <>
        <NavBar
          currency={currency}
          category={category}
          cart={cart}
          handleCurrencyChange={this.handleCurrencyChange}
          handleCategoryChange={this.handleCategoryChange}
          handleSavePreference={this.handleSavePreference}
          handleChangeCart={this.handleChangeCart}
          handleClearCart={this.handleClearCart}
          handleOpenCart={this.handleOpenCart}
        />
        <Body
          category={category}
          bodyPage={bodyPage}
          currency={currency}
          product={product}
          cart={cart}
          handleChangeProduct={this.handleChangeProduct}
          handleChangeCart={this.handleChangeCart}
          handleAddToCart={this.handleAddToCart}
          handleClearCart={this.handleClearCart}
        />
        <div id="overlay"></div>
        <Alert show={this.state.showAlert} message={this.state.alertMessage} />
      </>
    );
  }
}

export default App;
