import React from "react";
import { getCartTotalCost, getCartTotalItems } from "../../functions";

class CartInfo extends React.PureComponent {
  render() {
    const { cart, currency, handleClearCart } = this.props;

    const totalPriceWithSymbol = getCartTotalCost(cart, currency);
    const totalPriceWithoutSymbol = Number(
      totalPriceWithSymbol.replace(currency, "")
    ); // Remove the symbol and turn it into a number
    const tax = currency + (0.21 * totalPriceWithoutSymbol).toFixed(2); // Display 21% tax with the symbol

    return (
      <>
        <table className="cart-info">
          <tbody>
            <Info name="Tax 21%:" value={tax} />
            <Info name="Quantity:" value={getCartTotalItems(cart)} />
            <Info name="Total:" value={totalPriceWithSymbol} />
          </tbody>
        </table>
        <div className="button green" onClick={handleClearCart} tabIndex="0">
          order
        </div>
      </>
    );
  }
}

export default CartInfo;

class Info extends React.PureComponent {
  render() {
    const { name, value } = this.props;

    return (
      <tr>
        <td>{name}</td>
        <td className="value">{value}</td>
      </tr>
    );
  }
}
