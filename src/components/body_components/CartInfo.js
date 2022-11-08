import React from "react";
import { getCartTotalCost, getCartTotalItems } from "../../functions";

class CartInfo extends React.Component {
  render() {
    const cartTotal = getCartTotalCost(this.props.cart, this.props.currency);
    const amount = Number(cartTotal.replace(this.props.currency, ""));
    const amountWithTax = this.props.currency + (0.21 * amount).toFixed(2);
    return (
      <>
        <table className="cart-info">
          <Info name="Tax 21%:" value={amountWithTax} />
          <Info name="Quantity:" value={getCartTotalItems(this.props.cart)} />
          <Info name="Total:" value={cartTotal} />
        </table>
        <div className="button" onClick={this.props.handleClearCart}>
          order
        </div>
      </>
    );
  }
}

export default CartInfo;

class Info extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.name}</td>
        <td className="value">{this.props.value}</td>
      </tr>
    );
  }
}
