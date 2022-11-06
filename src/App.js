import "./App.css";
import NavBar from "./components/NavBar";
import Body from "./components/body";
import React from "react";
import { isLastItem, itemInCart } from "./functions";

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
      (cartItem) => item.id !== cartItem.id
    );
    this.setState({ cart: cartCopy });
  }

  handleDecreaseItemAmount(item) {
    let cartCopy = this.state.cart.map((cartItem) =>
      item.id !== cartItem.id
        ? cartItem
        : {
            ...cartItem,
            amount: cartItem.amount - 1,
          }
    );
    this.setState({ cart: cartCopy });
  }

  handleIncreaseItemAmount(item) {
    let cartCopy = this.state.cart.map((cartItem) =>
      item.id !== cartItem.id
        ? cartItem
        : {
            ...cartItem,
            amount: cartItem.amount + 1,
          }
    );
    this.setState({ cart: cartCopy });
  }

  handleChangeCart(item, action) {
    switch (action) {
      case "add":
        this.handleIncreaseItemAmount(item);
        break;
      default: // Remove item from cart
        isLastItem(this.state.cart, item)
          ? this.handleRemoveFromCart(item)
          : this.handleDecreaseItemAmount(item);
        break;
    }
  }

  handleChangeProduct(product) {
    this.setState({ bodyPage: "pdp", product: product });
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
        />
        <Body
          category={this.state.category}
          bodyPage={this.state.bodyPage}
          currency={this.state.currency}
          product={this.state.product}
          handleAddToCart={this.handleAddToCart}
          handleChangeProduct={this.handleChangeProduct}
        />
        <div id="overlay"></div>
      </>
    );
  }
}

export default App;
