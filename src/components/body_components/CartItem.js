import React from "react";
import addIcon from "../../images/plus-square.svg";
import removeIcon from "../../images/minus-square.svg";
import { getPriceByCurrency } from "../../functions";
import Attributes from "./attributes";
import uuid from "react-uuid";
import CartImage from "./CartImage";

class CartItem extends React.Component {
  render() {
    const { item, currency, handleChangeCart } = this.props;

    return (
      <>
        <div className="cart-item">
          <CartItemInfo item={item} currency={currency} />
          <div className="left">
            <CartItemControls item={item} handleChangeCart={handleChangeCart} />
            <CartImage gallery={item.gallery} />
          </div>
        </div>
        <div className="line"></div>
      </>
    );
  }
}

class CartItemInfo extends React.Component {
  render() {
    const { item, currency } = this.props;
    return (
      <div className="cart-item-info">
        <div className="c-item-name">
          <span>{item.brand}</span>
          <br />
          <span>{item.name}</span>
        </div>
        <div className="c-item-price">
          {getPriceByCurrency(item.prices, currency, item.amount)}
        </div>
        {/*Attributes here*/}
        {item.attributes.map((attribute) => {
          return (
            <Attributes
              key={uuid()}
              attribute={attribute}
              selectedAttributes={item.selectedAttributes}
            />
          );
        })}
      </div>
    );
  }
}

class CartItemControls extends React.Component {
  render() {
    const { item, handleChangeCart } = this.props;
    return (
      <div className="cart-item-controls">
        <img
          src={addIcon}
          alt=""
          onClick={() => {
            handleChangeCart(item, "add");
          }}
        />
        <div>{item.amount}</div>
        <img
          src={removeIcon}
          alt=""
          onClick={() => {
            handleChangeCart(item, "remove");
          }}
        />
      </div>
    );
  }
}

export default CartItem;
