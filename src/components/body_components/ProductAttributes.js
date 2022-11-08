import React from "react";
import uuid from "react-uuid";
import { getClassName } from "../../functions";

class ProductAttributes extends React.Component {
  renderSwitch(param, attributeValues, attribute) {
    switch (param) {
      case "text":
        return (
          <TextAttribute
            key={uuid()}
            data={attributeValues}
            attribute={attribute}
            selectedAttributes={this.props.selectedAttributes}
            handleChangeAttributes={this.props.handleChangeAttributes}
          />
        );
      case "swatch":
        return (
          <SwatchAttribute
            key={uuid()}
            data={attributeValues}
            attribute={attribute}
            selectedAttributes={this.props.selectedAttributes}
            handleChangeAttributes={this.props.handleChangeAttributes}
          />
        );
      default:
        return null;
    }
  }

  render() {
    const { attribute } = this.props;
    return (
      <div className="attribute">
        <div id="m-attribute-name">{attribute.name}</div>
        <div id="m-attribute-values">
          {attribute.items.map((attributeValues) =>
            this.renderSwitch(attribute.type, attributeValues, attribute)
          )}
        </div>
      </div>
    );
  }
}

class TextAttribute extends React.Component {
  render() {
    const { data, attribute, selectedAttributes, handleChangeAttributes } =
      this.props;

    return (
      <div
        className={getClassName("text", data, selectedAttributes, attribute)}
        onClick={() => {
          handleChangeAttributes(data, attribute);
        }}
      >
        {data.value}
      </div>
    );
  }
}

class SwatchAttribute extends React.Component {
  render() {
    const { data, attribute, selectedAttributes, handleChangeAttributes } =
      this.props;
    const style = { backgroundColor: this.props.data.value };
    return (
      <div
        className={getClassName("swatch", data, selectedAttributes, attribute)}
        onClick={() => {
          handleChangeAttributes(data, attribute);
        }}
        style={style}
      ></div>
    );
  }
}

export default ProductAttributes;
