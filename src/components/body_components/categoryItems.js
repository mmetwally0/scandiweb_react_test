import React from "react";
import { ALL_ITEMS_IN_CATEGORY, PRODUCT_BY_ID } from "../queries";
import { Query } from "@apollo/client/react/components";
import addToCart from "../../images/addToCart.svg";
import {
  getPriceByCurrency,
  createCartItem,
  addDefaultAttributes,
} from "../../functions";

class CategoryItems extends React.Component {
  render() {
    return (
      <div className="category-page body" ref={this.ref}>
        <h1>{this.props.category}</h1>
        <div className="category-items-container">
          <Query
            query={ALL_ITEMS_IN_CATEGORY}
            variables={{ input: { title: this.props.category } }}
          >
            {({ loading, data }) => {
              // Wait until data is fetched before rendering anything
              if (loading) return null;

              const productsData = data.category.products;
              return productsData.map((product) => (
                <CategoryPageItem
                  product={product}
                  key={product.id}
                  currency={this.props.currency}
                  handleAddToCart={this.props.handleAddToCart}
                />
              ));
            }}
          </Query>
        </div>
      </div>
    );
  }
}

class CategoryPageItem extends React.Component {
  render() {
    const { product, currency } = this.props;
    return (
      <div
        className={`item-in-category ${product.inStock ? "" : "out-of-stock"}`}
      >
        <div className="item-image">
          <img src={product.gallery[0]} alt="" />
        </div>
        <AddToCartIcon
          itemId={product.id}
          handleAddToCart={this.props.handleAddToCart}
        />
        <div className="item-name">{product.name}</div>
        <div className="item-price">
          {getPriceByCurrency(product.prices, currency)}
        </div>
      </div>
    );
  }
}

class AddToCartIcon extends React.Component {
  render() {
    return (
      <Query
        query={PRODUCT_BY_ID}
        variables={{
          productId: this.props.itemId,
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
                const product = data.product;
                const attributes = addDefaultAttributes(product);
                const newItem = createCartItem(product, 1, attributes);
                this.props.handleAddToCart(newItem);
              }}
            />
          );
        }}
      </Query>
    );
  }
}

export default CategoryItems;
