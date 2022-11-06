import React from "react";
import { getPriceByCurrency } from "../../functions";
import uuid from "react-uuid";
import ProductAttributes from "./ProductAttributes";

class ProductInfo extends React.Component {
  render() {
    return (
      <div className="product-info">
        <div className="p-item-name">
          <span>{this.props.product.brand}</span>
          <span>{this.props.product.name}</span>
        </div>
        {/*Attributes here*/}
        {this.props.product.attributes.map((attribute) => {
          return (
            <ProductAttributes
              attribute={attribute}
              key={uuid()}
              selectedAttributes={this.props.selectedAttributes}
              handleChangeAttributes={this.props.handleChangeAttributes}
            />
          );
        })}
        <div className="p-item-price">
          <span>Price:</span>
          {getPriceByCurrency(
            this.props.product.prices,
            this.props.currency,
            this.props.product.amount
          )}
        </div>
        <AddToCartButton />
      </div>
    );
  }
}

class AddToCartButton extends React.Component {
  render() {
    return <div className="add-to-cart-button">add to cart</div>;
  }
}
export default ProductInfo;
