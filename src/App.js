import "./App.css";
import NavBar from "./components/NavBar";
import Body from "./components/body";
import React from "react";
import { isLastItem, itemInCart, isItemIdentical } from "./functions";
import cart from "./components/body_components/cart";

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
    };

    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleSavePreference = this.handleSavePreference.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleChangeCart = this.handleChangeCart.bind(this);
    this.handleChangeProduct = this.handleChangeProduct.bind(this);
    this.handleClearCart = this.handleClearCart.bind(this);
    this.handleOpenCart = this.handleOpenCart.bind(this);
  }

  componentDidMount() {
    if (this.state.storeState) {
      // Retrieve the state saved in the browser
      const savedState = localStorage.getItem("APP_STATE"); // String
      const savedStateObject = JSON.parse(savedState); // Object
      const stringifiedState = JSON.stringify(this.state); // String

      // If there is state saved, set the current state to it.
      savedState
        ? savedState !== stringifiedState && this.setState(savedStateObject) // If the saved state doesn't match the current state replace the current state
        : localStorage.setItem("APP_STATE", stringifiedState); // If there is no saved state, save the current state
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.state.storeState
      ? localStorage.setItem("APP_STATE", JSON.stringify(this.state))
      : localStorage.removeItem("APP_STATE");
  }

  handleCurrencyChange(currency) {
    this.setState({ currency: currency });
  }

  handleCategoryChange(name) {
    this.setState({ category: name, bodyPage: "category" });
  }

  handleSavePreference() {
    this.setState({ storeState: !this.state.storeState });
  }

  handleAddToCart(item) {
    !itemInCart(this.state.cart, item)
      ? this.setState({ cart: [...this.state.cart, item] })
      : this.handleChangeCart(item, "add");
  }

  handleRemoveFromCart(item) {
    let cartCopy = this.state.cart.filter(
      (cartItem) => !isItemIdentical(item, cartItem)
    );
    this.setState({ cart: cartCopy });
  }

  handleChangeItemAmount(item, add) {
    let cartCopy = this.state.cart.map((cartItem) =>
      !isItemIdentical(item, cartItem)
        ? cartItem
        : {
            ...cartItem,
            amount: add ? cartItem.amount + 1 : cartItem.amount - 1,
          }
    );
    this.setState({ cart: cartCopy });
  }

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

  handleChangeProduct(product) {
    this.setState({ bodyPage: "pdp", product: product });
  }

  handleOpenCart() {
    this.setState({ bodyPage: "cart" });
  }

  handleClearCart() {
    this.setState({ cart: [] });
  }

  render() {
    return (
      // Nav Bar component
      // Body Component
      <>
        <NavBar
          currency={this.state.currency}
          category={this.state.category}
          cart={this.state.cart}
          handleCurrencyChange={this.handleCurrencyChange}
          handleCategoryChange={this.handleCategoryChange}
          handleSavePreference={this.handleSavePreference}
          handleChangeCart={this.handleChangeCart}
          handleClearCart={this.handleClearCart}
          handleOpenCart={this.handleOpenCart}
        />
        <Body
          category={this.state.category}
          bodyPage={this.state.bodyPage}
          currency={this.state.currency}
          product={this.state.product}
          handleAddToCart={this.handleAddToCart}
          handleChangeProduct={this.handleChangeProduct}
          cart={this.state.cart}
          handleChangeCart={this.handleChangeCart}
          handleClearCart={this.handleClearCart}
        />
        <div id="overlay"></div>
      </>
    );
  }
}

export default App;
