import React from "react";
import uuid from "react-uuid";

class ProductImages extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentImage: "",
      otherImages: [],
    };

    this.handleSwapImages = this.handleSwapImages.bind(this);
  }

  componentDidMount() {
    if (this.props.images.length > 1) {
      let images = [...this.props.images];
      const lastImage = images.pop();
      this.setState({ currentImage: lastImage, otherImages: images });
    } else {
      this.setState({ currentImage: this.props.images[0] });
    }
  }

  handleSwapImages(image) {
    if (this.state.otherImages.length > 0) {
      let otherImagesCopy = [...this.state.otherImages];
      const changingImage = otherImagesCopy.indexOf(image);
      otherImagesCopy[changingImage] = this.state.currentImage;

      this.setState({ currentImage: image, otherImages: otherImagesCopy });
    }
  }

  render() {
    return (
      <div className="product-images">
        <div className="mini-images">
          {this.state.otherImages.map((image) => (
            <MiniImage
              image={image}
              handleSwapImages={this.handleSwapImages}
              key={uuid()}
              style={`--i:${this.state.otherImages.indexOf(image)}`}
            />
          ))}
        </div>
        <div className="main-image">
          <img src={this.state.currentImage} alt="" />
        </div>
      </div>
    );
  }
}

class MiniImage extends React.Component {
  render() {
    return (
      <div className="mini-image-container">
        <img
          src={this.props.image}
          alt=""
          onClick={() => this.props.handleSwapImages(this.props.image)}
        />
      </div>
    );
  }
}

export default ProductImages;
