import React from "react";
import ProductImages from "./ProductImages";
import ProductInfo from "./ProductInfo";
import { PRODUCT_BY_ID } from "../queries";
import { Query } from "@apollo/client/react/components";
import { addDefaultAttributes, isSelectedAttribute } from "../../functions";

class ProductPage extends React.PureComponent {
  render() {
    const { productId, currency, handleAddToCart } = this.props;
    return (
      <Query
        query={PRODUCT_BY_ID}
        variables={{
          productId: productId,
        }}
      >
        {({ loading, data }) => {
          // Wait until data is fetched before rendering anything
          if (loading) return null;

          return (
            <Product
              product={data.product}
              currency={currency}
              handleAddToCart={handleAddToCart}
            />
          );
        }}
      </Query>
    );
  }
}

class Product extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedAttributes: addDefaultAttributes(this.props.product),
    };

    this.handleChangeAttributes = this.handleChangeAttributes.bind(this);
  }

  // If the attribute is not selected, change it to be the selected attribute
  handleChangeAttributes(attributeValue, attribute) {
    if (
      !isSelectedAttribute(
        attributeValue,
        attribute,
        this.state.selectedAttributes
      )
    ) {
      const attributesCopy = { ...this.state.selectedAttributes };
      attributesCopy[attribute.id] = JSON.stringify(attributeValue); // Replace the attribute
      this.setState({ selectedAttributes: attributesCopy });
    }
  }

  render() {
    const { product, currency, handleAddToCart } = this.props;

    return (
      <div className="product" id="body">
        <ProductImages images={product.gallery} />
        <ProductInfo
          product={product}
          currency={currency}
          selectedAttributes={this.state.selectedAttributes}
          handleChangeAttributes={this.handleChangeAttributes}
          handleAddToCart={handleAddToCart}
        />
      </div>
    );
  }
}

export default ProductPage;
