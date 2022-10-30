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
        <Categories />
        <img src={logo} alt="" />
        <div>
          <CurrencySwitcher />
          <MiniCart />
        </div>
      </nav>
    );
  }
}

export default NavBar;
