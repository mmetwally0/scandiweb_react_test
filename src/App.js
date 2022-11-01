import "./App.css";
import NavBar from "./components/NavBar";
import Body from "./components/body";
import React from "react";

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

  handleCurrencyChange(currency) {
    this.setState({ currency: currency });
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
        <div id="overlay"></div>
      </>
    );
  }
}

export default App;
