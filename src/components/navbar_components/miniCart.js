import React from "react";
import ClickOutsideToClose from "../clickOutsideToClose";
import cart from "../../images/empty-cart.svg";
import MiniCartItem from "../body_components/miniCartItem";
import uuid from "react-uuid";
import { getCartTotalItems, getCartTotalCost } from "../../functions";

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
    document.querySelector(".body").style.pointerEvents = "auto";
  }

  handleCartOpen() {
    this.setState({ show: !this.state.show });
    this.handleBlackScreen();
  }

  handleBlackScreen() {
    switch (this.state.show) {
      case false:
        document.querySelector("#overlay").style.display = "block";
        document.querySelector(".body").style.pointerEvents = "none";
        break;
      default:
        document.querySelector("#overlay").style.display = "none";
        document.querySelector(".body").style.pointerEvents = "auto";
        break;
    }
  }

  render() {
    return (
      <div className="minicart" ref={this.ref}>
        <MiniCartControls
          handleCartOpen={this.handleCartOpen}
          show={this.state.show}
          cart={this.props.cart}
        />
        <MiniCartMenu
          show={this.state.show}
          cart={this.props.cart}
          currency={this.props.currency}
          handleChangeCart={this.props.handleChangeCart}
        />
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
          <div className="mini-cart-info">
            <MiniCartHeading cart={this.props.cart} />
            <div className="mini-cart-items">
              {this.props.cart.map((cartItem) => (
                <MiniCartItem
                  item={cartItem}
                  key={uuid()}
                  currency={this.props.currency}
                  handleChangeCart={this.props.handleChangeCart}
                />
              ))}
            </div>
            <div id="mini-cart-footer">
              <span>Total</span>
              <span id="m-price">
                {getCartTotalCost(this.props.cart, this.props.currency)}
              </span>
            </div>
          </div>
          <div className="mini-cart-buttons">
            <div className="button" id="view-bag">
              view bag
            </div>
            <div className="button" id="check-out">
              check out
            </div>
          </div>
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
        {getCartTotalItems(this.props.cart) !== 0 && (
          <div className="cart-label">{getCartTotalItems(this.props.cart)}</div>
        )}
      </div>
    );
  }
}

class MiniCartHeading extends React.Component {
  render() {
    const count = getCartTotalItems(this.props.cart);
    return (
      <div id="mini-cart-heading">
        <span>My bag, </span>
        {count} {count === 1 ? "item" : "items"}
      </div>
    );
  }
}

export default MiniCart;
