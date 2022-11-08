import React from "react";
import { createCartItem, getPriceByCurrency } from "../../functions";
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
        <AddToCartButton
          selectedAttributes={this.props.selectedAttributes}
          product={this.props.product}
          handleAddToCart={this.props.handleAddToCart}
        />
      </div>
    );
  }
}

class AddToCartButton extends React.Component {
  render() {
    return (
      <div
        className="add-to-cart-button"
        onClick={() => {
          this.props.handleAddToCart(
            createCartItem(this.props.product, this.props.selectedAttributes)
          );
        }}
      >
        add to cart
      </div>
    );
  }
}

export default ProductInfo;
