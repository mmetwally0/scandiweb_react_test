import React from "react";
import ClickOutsideToClose from "../clickOutsideToClose";
import cartIcon from "../../images/empty-cart.svg";
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
    document.getElementById("overlay").style.display = "none";
    document.getElementById("body").style.pointerEvents = "auto";
  }

  handleCartOpen() {
    this.setState({ show: !this.state.show });
    this.handleBlackScreen();
  }

  handleBlackScreen() {
    switch (this.state.show) {
      case false:
        document.getElementById("overlay").style.display = "block";
        document.getElementById("body").style.pointerEvents = "none";
        break;
      default:
        document.getElementById("overlay").style.display = "none";
        document.getElementById("body").style.pointerEvents = "auto";
        break;
    }
  }

  render() {
    const {
      cart,
      currency,
      handleChangeCart,
      handleClearCart,
      handleOpenCart,
    } = this.props;

    return (
      <div className="minicart" ref={this.ref}>
        <MiniCartControls
          handleCartOpen={this.handleCartOpen}
          show={this.state.show}
          cart={cart}
        />
        <MiniCartMenu
          cart={cart}
          currency={currency}
          show={this.state.show}
          handleChangeCart={handleChangeCart}
          handleClearCart={handleClearCart}
          handleOpenCart={handleOpenCart}
          handleCartOpen={this.handleCartOpen}
        />
      </div>
    );
  }
}

class MiniCartMenu extends React.PureComponent {
  render() {
    const {
      cart,
      currency,
      show,
      handleOpenCart,
      handleClearCart,
      handleChangeCart,
      handleCartOpen,
    } = this.props;

    if (!show) return null;

    return (
      <>
        <div className="mini-cart-menu menu">
          <div className="mini-cart-info">
            <MiniCartHeading cart={cart} />
            <div className="mini-cart-items">
              {cart.map((cartItem) => (
                <MiniCartItem
                  key={uuid()}
                  item={cartItem}
                  currency={currency}
                  handleChangeCart={handleChangeCart}
                />
              ))}
            </div>
            <MiniCartFooter cart={cart} currency={currency} />
          </div>
          <div className="mini-cart-buttons">
            <div
              className="button"
              id="view-bag"
              onClick={() => {
                handleOpenCart();
                handleCartOpen();
              }}
            >
              view bag
            </div>
            <div
              className="button green"
              id="check-out"
              onClick={handleClearCart}
            >
              check out
            </div>
          </div>
        </div>
      </>
    );
  }
}

class MiniCartControls extends React.PureComponent {
  render() {
    const { show, cart, handleCartOpen } = this.props;
    return (
      <div
        // className={"minicart-controls" + " " + (show && "active")}
        className={`minicart-controls ${show && "active"}`}
        onClick={handleCartOpen}
      >
        <img src={cartIcon} alt="" />
        {getCartTotalItems(cart) > 0 && (
          <div className="cart-label">{getCartTotalItems(cart)}</div>
        )}
      </div>
    );
  }
}

class MiniCartHeading extends React.PureComponent {
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

class MiniCartFooter extends React.PureComponent {
  render() {
    const { cart, currency } = this.props;
    return (
      <div id="mini-cart-footer">
        <span>Total</span>
        <span id="m-price">{getCartTotalCost(cart, currency)}</span>
      </div>
    );
  }
}

export default MiniCart;
