import React from "react";
import uuid from "react-uuid";

class ProductImages extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentImage: "",
      miniImages: [],
    };

    this.handleSwapImages = this.handleSwapImages.bind(this);
  }

  componentDidMount() {
    if (this.props.images.length > 1) {
      let images = [...this.props.images];
      const lastImage = images.pop(); // The last image in the list is set as the main image, and the remaining images are set as mini-images
      this.setState({ currentImage: lastImage, miniImages: images });
    } else {
      this.setState({ currentImage: this.props.images[0] });
    }
  }

  handleSwapImages(image) {
    let miniImagesCopy = [...this.state.miniImages];
    const changingImage = miniImagesCopy.indexOf(image);
    miniImagesCopy[changingImage] = this.state.currentImage; // Replace the image in the list by the main image

    this.setState({ currentImage: image, miniImages: miniImagesCopy }); // Set main image as the image clicked
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

class MiniImage extends React.Component {
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
