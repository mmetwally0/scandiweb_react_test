import React from "react";
import { createCartItem, getPriceByCurrency } from "../../functions";
import uuid from "react-uuid";
import ProductAttributes from "./ProductAttributes";
import parse from "html-react-parser";

class ProductInfo extends React.PureComponent {
  render() {
    const {
      product,
      currency,
      selectedAttributes,
      handleAddToCart,
      handleChangeAttributes,
    } = this.props;

    return (
      <div className={`product-info ${!product.inStock && "out-of-stock"}`}>
        <div className="p-item-name">
          <span>{product.brand}</span>
          <span>{product.name}</span>
        </div>
        {/*Attributes here*/}
        {product.attributes.map((attribute) => {
          return (
            <ProductAttributes
              key={uuid()}
              attribute={attribute}
              selectedAttributes={selectedAttributes}
              handleChangeAttributes={handleChangeAttributes}
            />
          );
        })}
        <div className="p-item-price">
          <span>Price:</span>
          {getPriceByCurrency(product.prices, currency, product.amount)}
        </div>
        <AddToCartButton
          selectedAttributes={selectedAttributes}
          product={product}
          handleAddToCart={handleAddToCart}
        />
        <ProductDescription description={product.description} />
      </div>
    );
  }
}

class AddToCartButton extends React.PureComponent {
  render() {
    const { product, selectedAttributes, handleAddToCart } = this.props;
    return (
      <div
        className="add-to-cart-button button green"
        onClick={() => {
          handleAddToCart(createCartItem(product, selectedAttributes));
        }}
      >
        add to cart
      </div>
    );
  }
}

class ProductDescription extends React.PureComponent {
  render() {
    const { description } = this.props;

    return description.includes("<") ? (
      <div className="product-description">{parse(description)}</div>
    ) : (
      <p className="product-description">{description}</p>
    );
  }
}

export default ProductInfo;
