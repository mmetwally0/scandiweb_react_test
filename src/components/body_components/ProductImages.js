import React from "react";
import uuid from "react-uuid";

class ProductImages extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentImage: "",
      miniImages: [],
    };

    this.handleSwapImages = this.handleSwapImages.bind(this);
  }

  componentDidMount() {
    const images = [...this.props.images];

    if (this.props.images.length > 1) {
      this.setState({ currentImage: images[0], miniImages: images });
    } else {
      this.setState({ currentImage: images[0] });
    }
  }

  handleSwapImages(image) {
    this.setState({ currentImage: image });
  }

  render() {
    return (
      <div className="product-images">
        <div className="mini-images">
          {this.state.miniImages.map((image) => (
            <MiniImage
              key={uuid()}
              image={image}
              handleSwapImages={this.handleSwapImages}
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

class MiniImage extends React.PureComponent {
  render() {
    const { image, handleSwapImages } = this.props;
    return (
      <div className="mini-image-container">
        <img src={image} alt="" onClick={() => handleSwapImages(image)} />
      </div>
    );
  }
}

export default ProductImages;
