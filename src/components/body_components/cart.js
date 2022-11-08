import React from "react";
import CartItems from "./CartItems";
import CartInfo from "./CartInfo";

class Cart extends React.Component {
  render() {
    return (
      <div className="cart body">
        <h1>CART</h1>
        <div className="line"></div>
        <CartItems
          cart={this.props.cart}
          currency={this.props.currency}
          handleChangeCart={this.props.handleChangeCart}
        />
        <CartInfo
          cart={this.props.cart}
          currency={this.props.currency}
          handleClearCart={this.props.handleClearCart}
        />
      </div>
    );
  }
}
export default Cart;
