import React from "react";
import { Query } from "@apollo/client/react/components";
import { ALL_CURRENCIES } from "../queries";
import ClickOutsideToClose from "../clickOutsideToClose";

import arrow from "../../images/arrow.svg";

class CurrencySwitcher extends ClickOutsideToClose {
  constructor(props) {
    super(props);

    this.state = {
      show: false, // Show menu or not
    };

    this.handleCartControls = this.handleCartControls.bind(this);
  }

  // If clicked outside the menu, close it
  onClickOutside() {
    this.setState({ show: false });
  }

  handleCartControls() {
    this.setState({ show: !this.state.show });
  }

  render() {
    return (
      <div className="currency-switcher" ref={this.ref}>
        <CurrencyMenuControls
          currency={this.props.currency}
          handleCartControls={this.handleCartControls}
          show={this.state.show}
        />

        <Query query={ALL_CURRENCIES}>
          {({ loading, data }) => {
            // Wait until data is fetched before rendering anything
            if (loading) {
              return null;
            }

            if (!this.state.show) {
              return null;
            }

            return (
              <>
                <div className="currency-switcher-menu menu">
                  <ul>
                    {data.currencies.map((currency) => (
                      <li
                        key={currency.label}
                        className={
                          this.props.currency === currency.symbol
                            ? "active"
                            : null
                        }
                        data-currency={currency.symbol}
                        onClick={this.props.handleCurrencyChange}
                      >
                        {`${currency.symbol}  ${currency.label}`}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            );
          }}
        </Query>
      </div>
    );
  }
}

class CurrencyMenuControls extends React.Component {
  render() {
    return (
      <div
        className="currency-controls"
        onClick={this.props.handleCartControls}
      >
        {this.props.currency}
        <img src={arrow} alt="" className={this.props.show ? "active" : null} />
      </div>
    );
  }
}

export default CurrencySwitcher;
