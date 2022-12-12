import React from "react";
import CartItems from "./CartItems";
import CartInfo from "./CartInfo";

class Cart extends React.PureComponent {
  render() {
    const { cart, currency, handleChangeCart, handleClearCart } = this.props;
    return (
      <div className="cart" id="body">
        <h1>CART</h1>
        <div className="line"></div>
        <CartItems
          cart={cart}
          currency={currency}
          handleChangeCart={handleChangeCart}
        />
        <CartInfo
          cart={cart}
          currency={currency}
          handleClearCart={handleClearCart}
        />
      </div>
    );
  }
}

export default Cart;
