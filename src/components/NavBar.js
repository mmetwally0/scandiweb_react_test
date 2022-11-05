import React from "react";
import Categories from "./navbar_components/categories";
import MiniCart from "./navbar_components/miniCart";
import CurrencySwitcher from "./navbar_components/currencySwitcher";

import logo from "../images/logo.svg";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav className="nav-bar">
        <Categories
          handleCategoryChange={this.props.handleCategoryChange}
          category={this.props.category}
        />
        <img
          src={logo}
          alt=""
          className="logo"
          onClick={this.props.handleSavePreference}
        />
        <div className="nav-links">
          <CurrencySwitcher
            currency={this.props.currency}
            handleCurrencyChange={this.props.handleCurrencyChange}
          />
          <MiniCart
            cart={this.props.cart}
            currency={this.props.currency}
            handleChangeCart={this.props.handleChangeCart}
          />
        </div>
      </nav>
    );
  }
}

export default NavBar;
