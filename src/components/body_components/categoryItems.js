import React from "react";
import { ALL_ITEMS_IN_CATEGORY, PRODUCT_BY_ID } from "../queries";
import { Query } from "@apollo/client/react/components";
import addToCart from "../../images/addToCart.svg";
import {
  getPriceByCurrency,
  createCartItem,
  addDefaultAttributes,
} from "../../functions";

class CategoryItems extends React.PureComponent {
  render() {
    const { category, currency, handleAddToCart, handleChangeProduct } =
      this.props;

    return (
      <div className="category-page" id="body" ref={this.ref}>
        <h1>{category}</h1>
        <div className="category-items-container">
          <Query
            query={ALL_ITEMS_IN_CATEGORY}
            variables={{ input: { title: category } }}
          >
            {({ loading, data }) => {
              // Wait until data is fetched before rendering anything
              if (loading) return null;

              const productsData = data.category.products;
              return productsData.map((product) => (
                <CategoryPageItem
                  product={product}
                  key={product.id}
                  currency={currency}
                  handleAddToCart={handleAddToCart}
                  handleChangeProduct={handleChangeProduct}
                />
              ));
            }}
          </Query>
        </div>
      </div>
    );
  }
}

class CategoryPageItem extends React.PureComponent {
  render() {
    const { product, currency, handleAddToCart, handleChangeProduct } =
      this.props;
    return (
      <div className={`item-in-category ${!product.inStock && "out-of-stock"}`}>
        <div className="item-image">
          <img src={product.gallery[0]} alt="" />
        </div>
        <AddToCartIcon itemId={product.id} handleAddToCart={handleAddToCart} />
        <div className="item-name">{product.name}</div>
        <div className="item-price">
          {getPriceByCurrency(product.prices, currency)}
        </div>
        <div
          id="category-item-overlay"
          onClick={() => {
            handleChangeProduct(product);
          }}
        ></div>
      </div>
    );
  }
}

class AddToCartIcon extends React.PureComponent {
  render() {
    const { itemId, handleAddToCart } = this.props;
    return (
      <Query
        query={PRODUCT_BY_ID}
        variables={{
          productId: itemId,
        }}
      >
        {({ loading, data }) => {
          // Wait until data is fetched before rendering anything
          if (loading) return null;

          return (
            <img
              className="add-to-cart-icon"
              src={addToCart}
              alt=""
              onClick={() => {
                // Create a cart item, by adding default attributes
                const attributes = addDefaultAttributes(data.product);
                const newItem = createCartItem(data.product, attributes);
                handleAddToCart(newItem);
              }}
            />
          );
        }}
      </Query>
    );
  }
}

export default CategoryItems;
