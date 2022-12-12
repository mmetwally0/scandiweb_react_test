import React from "react";
import Categories from "./navbar_components/categories";
import MiniCart from "./navbar_components/miniCart";
import CurrencySwitcher from "./navbar_components/currencySwitcher";

import logo from "../images/logo.svg";

class NavBar extends React.Component {
  render() {
    const {
      category,
      currency,
      cart,
      handleCategoryChange,
      handleSavePreference,
      handleCurrencyChange,
      handleChangeCart,
      handleClearCart,
      handleOpenCart,
    } = this.props;

    return (
      <nav className="nav-bar">
        <Categories
          handleCategoryChange={handleCategoryChange}
          category={category}
        />
        <img
          src={logo}
          alt=""
          className="logo"
          onClick={handleSavePreference}
        />
        <div className="nav-links">
          <CurrencySwitcher
            currency={currency}
            handleCurrencyChange={handleCurrencyChange}
          />
          <MiniCart
            cart={cart}
            currency={currency}
            handleChangeCart={handleChangeCart}
            handleClearCart={handleClearCart}
            handleOpenCart={handleOpenCart}
          />
        </div>
      </nav>
    );
  }
}

export default NavBar;
