import React from "react";
import addIcon from "../../images/plus-square.svg";
import removeIcon from "../../images/minus-square.svg";
import { getPriceByCurrency } from "../../functions";
import Attributes from "./attributes";
import uuid from "react-uuid";

class MiniCartItem extends React.Component {
  render() {
    return (
      <div className="mini-cart-item">
        <MiniCartItemInfo
          item={this.props.item}
          currency={this.props.currency}
        />
        <MiniCartItemControls
          item={this.props.item}
          handleChangeCart={this.props.handleChangeCart}
        />
        <div className="minicart-item-image">
          <img src={this.props.item.gallery[0]} alt="" />
        </div>
      </div>
    );
  }
}

class MiniCartItemInfo extends React.Component {
  render() {
    return (
      <div className="minicart-item-info">
        <div className="m-item-name">{this.props.item.name}</div>
        <div className="m-item-price">
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

class MiniCartItemControls extends React.Component {
  render() {
    return (
      <div className="minicart-item-controls">
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

export default MiniCartItem;
