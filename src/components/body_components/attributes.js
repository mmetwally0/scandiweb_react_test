import React from "react";
import uuid from "react-uuid";
import { isSelectedAttribute, getClassName } from "../../functions";

export class Attributes extends React.Component {
  renderSwitch(param, attributeValues, attribute) {
    switch (param) {
      case "text":
        return (
          <TextAttribute
            key={uuid()}
            data={attributeValues}
            attribute={attribute}
            selectedAttributes={this.props.selectedAttributes}
          />
        );
      case "swatch":
        return (
          <SwatchAttribute
            key={uuid()}
            data={attributeValues}
            attribute={attribute}
            selectedAttributes={this.props.selectedAttributes}
          />
        );
      default:
        return null;
    }
  }

  render() {
    return (
      <div className="attribute">
        <div id="m-attribute-name">{this.props.attribute.name}</div>
        <div id="m-attribute-values">
          {this.props.attribute.items.map((attributeValues) =>
            this.renderSwitch(
              this.props.attribute.type,
              attributeValues,
              this.props.attribute
            )
          )}
        </div>
      </div>
    );
  }
}

class TextAttribute extends React.Component {
  render() {
    return (
      <div
        className={getClassName(
          "text",
          this.props.data,
          this.props.selectedAttributes,
          this.props.attribute
        )}
      >
        {this.props.data.value}
      </div>
    );
  }
}

class SwatchAttribute extends React.Component {
  render() {
    const style = { backgroundColor: this.props.data.value };
    return (
      <div
        className={getClassName(
          "swatch",
          this.props.data,
          this.props.selectedAttributes,
          this.props.attribute
        )}
        style={style}
      ></div>
    );
  }
}

export default Attributes;