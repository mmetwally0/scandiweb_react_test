import "./App.css";
import React from "react";
import NavBar from "./components/NavBar";
import Body from "./components/body";

class App extends React.Component {
  constructor(props) {
    super(props);

    // State of the App
    this.state = {
      currency: "$",
      category: "all",
      cart: [],
      bodyPage: "category",
    };

    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
  }

  handleCurrencyChange(e) {
    this.setState({ currency: e.target.dataset.currency });
  }

  handleCategoryChange(e) {
    this.setState({ category: e.target.dataset.name });
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
        />
        <Body
          category={this.state.category}
          bodyPage={this.state.bodyPage}
          currency={this.state.currency}
        />
      </>
    );
  }
}

export default App;
