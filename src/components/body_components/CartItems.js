import React from "react";
import CartItem from "./CartItem";
import uuid from "react-uuid";

class CartItems extends React.PureComponent {
  render() {
    const { cart, currency, handleChangeCart } = this.props;
    return (
      <div>
        {cart.map((cartItem) => (
          <CartItem
            item={cartItem}
            key={uuid()}
            currency={currency}
            handleChangeCart={handleChangeCart}
          />
        ))}
      </div>
    );
  }
}

export default CartItems;
