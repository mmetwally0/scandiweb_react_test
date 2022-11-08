import React from "react";
import CartItem from "./CartItem";
import uuid from "react-uuid";

class CartItems extends React.Component {
  render() {
    return (
      <div>
        {this.props.cart.map((cartItem) => (
          <CartItem
            item={cartItem}
            key={uuid()}
            currency={this.props.currency}
            handleChangeCart={this.props.handleChangeCart}
          />
        ))}
      </div>
    );
  }
}

export default CartItems;
