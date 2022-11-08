import React from "react";
import ProductImages from "./ProductImages";
import ProductInfo from "./ProductInfo";
import { PRODUCT_BY_ID } from "../queries";
import { Query } from "@apollo/client/react/components";
import { addDefaultAttributes, isSelectedAttribute } from "../../functions";

class ProductPage extends React.Component {
  render() {
    return (
      <Query
        query={PRODUCT_BY_ID}
        variables={{
          productId: this.props.productId,
        }}
      >
        {({ loading, data }) => {
          // Wait until data is fetched before rendering anything
          if (loading) return null;

          return (
            <Product
              product={data.product}
              currency={this.props.currency}
              handleAddToCart={this.props.handleAddToCart}
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

  handleChangeAttributes(attributeValue, attribute) {
    if (
      !isSelectedAttribute(
        attributeValue,
        attribute,
        this.state.selectedAttributes
      )
    ) {
      const placeHolder = { ...this.state.selectedAttributes };
      placeHolder[attribute.id] = JSON.stringify(attributeValue);
      this.setState({ selectedAttributes: placeHolder });
    }
  }

  render() {
    const { product, currency } = this.props;

    return (
      <div className="product body">
        <ProductImages images={product.gallery} />
        <ProductInfo
          product={product}
          currency={currency}
          selectedAttributes={this.state.selectedAttributes}
          handleChangeAttributes={this.handleChangeAttributes}
          handleAddToCart={this.props.handleAddToCart}
        />
      </div>
    );
  }
}

export default ProductPage;
