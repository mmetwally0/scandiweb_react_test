import React from "react";
import { Query } from "@apollo/client/react/components";
import { PRODUCT_BY_ID } from "../queries";
import addIcon from "../../images/plus-square.svg";
import removeIcon from "../../images/minus-square.svg";
import { getPriceByCurrency } from "../../functions";

class MiniCartItem extends React.Component {
  render() {
    return (
      <div className="mini-cart-item">
        <MiniCartItemInfo
          item={this.props.item}
          currency={this.props.currency}
        />
        <MiniCartItemControls item={this.props.item} />
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
        <p>{this.props.item.name}</p>
        <p>{getPriceByCurrency(this.props.item.prices, this.props.currency)}</p>
        {/*Attributes here*/}
      </div>
    );
  }
}

class MiniCartItemControls extends React.Component {
  render() {
    return (
      <div className="minicart-item-controls">
        <img src={addIcon} alt="" />
        {this.props.item.amount}
        <img src={removeIcon} alt="" />
      </div>
    );
  }
}

export default MiniCartItem;
