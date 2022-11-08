import React from "react";
import swipeLeft from "../../images/swipe-left.svg";
import swipeRight from "../../images/swipe-right.svg";

class CartImage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentImage: this.props.gallery[0],
      count: 0,
    };
  }

  handleChangeImage(operation) {
    let index = this.props.gallery.indexOf(this.state.currentImage);
    const length = this.props.gallery.length;
    switch (operation) {
      case "next":
        index === length - 1 ? (index = 0) : index++;
        break;
      default:
        index === 0 ? (index = length - 1) : index--;
        break;
    }
    this.setState({ currentImage: this.props.gallery[index] });
  }

  handleNextImage(index) {}

  render() {
    return (
      <div className="cart-item-image">
        <img src={this.state.currentImage} alt="" />
        {this.props.gallery.length > 1 ? (
          <div className="image-controls">
            <img
              src={swipeLeft}
              alt="swipe left"
              onClick={() => {
                this.handleChangeImage("previous");
              }}
            />
            <img
              src={swipeRight}
              alt="swipe right"
              onClick={() => {
                this.handleChangeImage("next");
              }}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

export default CartImage;
