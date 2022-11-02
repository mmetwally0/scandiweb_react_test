import React from "react";
import { ALL_ITEMS_IN_CATEGORY } from "../queries";
import { Query } from "@apollo/client/react/components";
import addToCart from "../../images/addToCart.svg";
import { getPriceByCurrency } from "../../functions";

class CategoryItems extends React.Component {
  render() {
    return (
      <div className="category-page" ref={this.ref}>
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
        <img className="add-to-cart-icon" src={addToCart} alt="" />
        <div className="item-name">{product.name}</div>
        <div className="item-price">
          {getPriceByCurrency(product.prices, currency)}
        </div>
      </div>
    );
  }
}

export default CategoryItems;
