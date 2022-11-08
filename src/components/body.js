import React from "react";
import CategoryItems from "./body_components/categoryItems";
import ProductPage from "./body_components/productPage";
import Cart from "./body_components/cart";

class Body extends React.Component {
  render() {
    const {
      category,
      currency,
      product,
      bodyPage,
      cart,
      handleAddToCart,
      handleChangeProduct,
      handleClearCart,
      handleChangeCart,
    } = this.props;

    switch (bodyPage) {
      case "category":
        return (
          <CategoryItems
            category={category}
            currency={currency}
            handleAddToCart={handleAddToCart}
            handleChangeProduct={handleChangeProduct}
          />
        );
      case "pdp":
        return (
          <ProductPage
            productId={product.id}
            currency={currency}
            handleAddToCart={handleAddToCart}
          />
        );
      case "cart":
        return (
          <Cart
            currency={currency}
            cart={cart}
            handleChangeCart={handleChangeCart}
            handleClearCart={handleClearCart}
          />
        );
    }
  }
}

export default Body;
