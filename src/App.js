import "./App.css";
import NavBar from "./components/NavBar";
import Body from "./components/body";
import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);

    // State of the App
    this.state = {
      currency: "$", // Current currency in the app
      category: "all", // Current category
      cart: [], // Stores all the items of the cart
      bodyPage: "category", // Whether to show PDP, Category Page, Cart
      storeState: true, // Save the User's cart browsing state
    };

    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleSavePreference = this.handleSavePreference.bind(this);
  }

  componentDidMount() {
    if (this.state.storeState) {
      // Retrieve the state saved in the browser
      let savedState = localStorage.getItem("APP_STATE");
      savedState = JSON.parse(savedState);

      // If there is state saved, set the current state to it.
      savedState
        ? savedState !== this.state && this.setState(savedState) // If the saved state doesn't match the current state replace the current state
        : localStorage.setItem("APP_STATE", JSON.stringify(this.state)); // If there is no saved state, save the current state
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.state !== prevState && this.state.storeState
      ? localStorage.setItem("APP_STATE", JSON.stringify(this.state))
      : localStorage.removeItem("APP_STATE");
  }

  handleCurrencyChange(currency) {
    this.setState({ currency: currency });
  }

  handleCategoryChange(e) {
    this.setState({ category: e.target.dataset.name });
  }

  handleSavePreference() {
    this.setState({ storeState: !this.state.storeState });
  }

  render() {
    return (
      // Nav Bar component
      // Body Component
      <>
        <NavBar
          currency={this.state.currency}
          category={this.state.category}
          handleCurrencyChange={this.handleCurrencyChange}
          handleCategoryChange={this.handleCategoryChange}
          handleSavePreference={this.handleSavePreference}
        />
        <Body
          category={this.state.category}
          bodyPage={this.state.bodyPage}
          currency={this.state.currency}
        />
        <div id="overlay"></div>
      </>
    );
  }
}

export default App;
