import React from "react";
import addIcon from "../../images/plus-square.svg";
import removeIcon from "../../images/minus-square.svg";
import { getPriceByCurrency } from "../../functions";
import Attributes from "./attributes";
import uuid from "react-uuid";
import CartImage from "./CartImage";

class CartItem extends React.Component {
  render() {
    return (
      <>
        <div className="cart-item">
          <CartItemInfo item={this.props.item} currency={this.props.currency} />
          <div className="left">
            <CartItemControls
              item={this.props.item}
              handleChangeCart={this.props.handleChangeCart}
            />
            <CartImage gallery={this.props.item.gallery} />
          </div>
        </div>
        <div className="line"></div>
      </>
    );
  }
}

class CartItemInfo extends React.Component {
  render() {
    return (
      <div className="cart-item-info">
        <div className="c-item-name">
          <span>{this.props.item.brand}</span>
          <br />
          <span>{this.props.item.name}</span>
        </div>
        <div className="c-item-price">
          {getPriceByCurrency(
            this.props.item.prices,
            this.props.currency,
            this.props.item.amount
          )}
        </div>
        {/*Attributes here*/}
        {this.props.item.attributes.map((attribute) => {
          return (
            <Attributes
              attribute={attribute}
              selectedAttributes={this.props.item.selectedAttributes}
              key={uuid()}
            />
          );
        })}
      </div>
    );
  }
}

class CartItemControls extends React.Component {
  render() {
    return (
      <div className="cart-item-controls">
        <img
          src={addIcon}
          alt=""
          onClick={() => {
            this.props.handleChangeCart(this.props.item, "add");
          }}
        />
        <div>{this.props.item.amount}</div>
        <img
          src={removeIcon}
          alt=""
          onClick={() => {
            this.props.handleChangeCart(this.props.item, "remove");
          }}
        />
      </div>
    );
  }
}

export default CartItem;
