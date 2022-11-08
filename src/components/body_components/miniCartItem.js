import React from "react";
import addIcon from "../../images/plus-square.svg";
import removeIcon from "../../images/minus-square.svg";
import { getPriceByCurrency } from "../../functions";
import Attributes from "./attributes";
import uuid from "react-uuid";

class MiniCartItem extends React.Component {
  render() {
    const { item, currency, handleChangeCart } = this.props;
    return (
      <div className="mini-cart-item">
        <MiniCartItemInfo item={item} currency={currency} />
        <MiniCartItemControls item={item} handleChangeCart={handleChangeCart} />
        <div className="minicart-item-image">
          <img src={item.gallery[0]} alt="" />
        </div>
      </div>
    );
  }
}

class MiniCartItemInfo extends React.Component {
  render() {
    const { item, currency } = this.props;
    return (
      <div className="minicart-item-info">
        <div className="m-item-name">
          {item.brand}
          <br />
          {item.name}
        </div>
        <div className="m-item-price">
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

class MiniCartItemControls extends React.Component {
  render() {
    const { item, handleChangeCart } = this.props;
    return (
      <div className="minicart-item-controls">
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

export default MiniCartItem;
