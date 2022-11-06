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
            <Product product={data.product} currency={this.props.currency} />
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
      selectedAttributes: [],
    };

    this.handleChangeAttributes = this.handleChangeAttributes.bind(this);
  }

  componentDidMount() {
    const defaults = addDefaultAttributes(this.props.product);
    this.setState({ selectedAttributes: defaults });
  }

  handleChangeAttributes(attribute) {
    if (!isSelectedAttribute(attribute, this.state.selectedAttributes)) {
      this.setState({
        selectedAttributes: [...this.state.selectedAttributes, attribute],
      });
      console.log("attribute not selected");
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
        />
      </div>
    );
  }
}

export default ProductPage;
