import React from "react";
import cartIcon from "../../images/empty-cart.svg";
import ClickOutsideToClose from "../clickOutsideToClose";

class MiniCart extends ClickOutsideToClose {
  constructor(props) {
    super(props);

    this.state = {
      show: false, // Show the mini cart or not
    };
  }

  // If clicked outside the mini cart, close it
  onClickOutside() {
    this.setState({ show: false });
  }

  render() {
    return (
      <div ref={this.ref}>
        <img
          src={cartIcon}
          onClick={() => {
            this.setState({ show: !this.state.show });
          }}
          alt=""
        />
        <MiniCartMenu show={this.state.show} />
      </div>
    );
  }
}

class MiniCartMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.show) {
      return null;
    }

    return (
      <>
        <div className="mini-cart-menu">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda,
          debitis eum excepturi laborum maiores praesentium? Alias at ea error
          iste perferendis perspiciatis quia quos sapiente veritatis voluptate.
          Adipisci aliquam asperiores autem consequuntur dicta, dolor ea eveniet
          excepturi facere fuga fugit, illum itaque nobis perferendis
          repudiandae sit sunt velit veniam voluptatum.
        </div>
      </>
    );
  }
}

export default MiniCart;
