import React from "react";
import uuid from "react-uuid";
import { getClassName } from "../../functions";

export class Attributes extends React.PureComponent {
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

class TextAttribute extends React.PureComponent {
  render() {
    const { data, attribute, selectedAttributes } = this.props;
    return (
      <div
        className={getClassName("text", data, selectedAttributes, attribute)}
      >
        {data.value}
      </div>
    );
  }
}

class SwatchAttribute extends React.PureComponent {
  render() {
    const { data, attribute, selectedAttributes } = this.props;
    const style = { backgroundColor: this.props.data.value };

    return (
      <div
        className={getClassName("swatch", data, selectedAttributes, attribute)}
        style={style}
      ></div>
    );
  }
}

export default Attributes;
