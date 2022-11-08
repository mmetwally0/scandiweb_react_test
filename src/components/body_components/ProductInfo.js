import React from "react";
import { createCartItem, getPriceByCurrency } from "../../functions";
import uuid from "react-uuid";
import ProductAttributes from "./ProductAttributes";

class ProductInfo extends React.Component {
  render() {
    const {
      product,
      currency,
      selectedAttributes,
      handleAddToCart,
      handleChangeAttributes,
    } = this.props;

    return (
      <div className="product-info">
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

class AddToCartButton extends React.Component {
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

class ProductDescription extends React.Component {
  render() {
    const { description } = this.props;

    return description.includes("<") ? (
      <div
        dangerouslySetInnerHTML={{ __html: description }}
        className="product-description"
      />
    ) : (
      <p className="product-description">{description}</p>
    );
  }
}

export default ProductInfo;
