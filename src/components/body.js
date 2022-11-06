import React from "react";
import CategoryItems from "./body_components/categoryItems";
import ProductPage from "./body_components/productPage";
import Cart from "./body_components/cart";

class Body extends React.Component {
  render() {
    switch (this.props.bodyPage) {
      case "category":
        return (
          <CategoryItems
            category={this.props.category}
            currency={this.props.currency}
            handleAddToCart={this.props.handleAddToCart}
            handleChangeProduct={this.props.handleChangeProduct}
          />
        );
      case "pdp":
        return (
          <ProductPage
            productId={this.props.product.id}
            currency={this.props.currency}
          />
        );
      case "cart":
        return <Cart />;
    }
  }
}

export default Body;
