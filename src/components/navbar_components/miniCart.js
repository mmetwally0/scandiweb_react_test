import React from "react";
import ClickOutsideToClose from "../clickOutsideToClose";
import cart from "../../images/empty-cart.svg";

class MiniCart extends ClickOutsideToClose {
  constructor(props) {
    super(props);

    this.state = {
      show: false, // Show the mini cart or not
    };

    this.handleCartOpen = this.handleCartOpen.bind(this);
  }

  // If clicked outside the mini cart, close it

  onClickOutside() {
    this.setState({ show: false });
    document.querySelector("#overlay").style.display = "none";
    document.body.style.pointerEvents = "auto";
  }

  handleCartOpen() {
    this.setState({ show: !this.state.show });
    this.handleBlackScreen();
  }

  handleBlackScreen() {
    switch (this.state.show) {
      case false:
        document.querySelector("#overlay").style.display = "block";
        document.body.style.pointerEvents = "none";
        break;
      default:
        document.querySelector("#overlay").style.display = "none";
        document.body.style.pointerEvents = "auto";
        break;
    }
  }

  render() {
    return (
      <div className="minicart" ref={this.ref}>
        <MiniCartControls
          handleCartOpen={this.handleCartOpen}
          show={this.state.show}
        />
        <MiniCartMenu show={this.state.show} />
      </div>
    );
  }
}

class MiniCartMenu extends React.Component {
  render() {
    if (!this.props.show) {
      return null;
    }

    return (
      <>
        <div className="mini-cart-menu menu">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda,
          debitis eum excepturi laborum maiores praesentium? Alias at ea error
          iste perferendis perspiciatis quia quos sapiente veritatis voluptate.
          Adipisci aliquam asperiores autem consequuntur dicta, dolor ea eveniet
          excepturi facere fuga fugit, illum itaque nobis perferendis
          repudiandae sit sunt velit veniam voluptatum. Lorem ipsum dolor sit
          amet, consectetur adipisicing elit. At dolorem harum quaerat vero
          vitae! Distinctio fugit nesciunt nobis repudiandae voluptate!
        </div>
      </>
    );
  }
}

class MiniCartControls extends React.Component {
  render() {
    return (
      <div
        className={`minicart-controls ${this.props.show ? "active" : null}`}
        onClick={this.props.handleCartOpen}
      >
        <img src={cart} alt="" />
      </div>
    );
  }
}

export default MiniCart;
