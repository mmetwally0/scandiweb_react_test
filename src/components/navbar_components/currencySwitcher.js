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

  // Show or hide the currency switcher
  handleCartControls() {
    this.setState({ show: !this.state.show });
  }

  render() {
    const { handleCurrencyChange } = this.props;

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
            if (loading) return null;
            if (!this.state.show) return null;

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
                            : ""
                        }
                        onClick={() => {
                          handleCurrencyChange(currency.symbol);
                          this.handleCartControls();
                        }}
                      >
                        {currency.symbol + "  " + currency.label}
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

class CurrencyMenuControls extends React.PureComponent {
  render() {
    const { currency, show, handleCartControls } = this.props;
    return (
      <div className="currency-controls" onClick={handleCartControls}>
        {currency}
        <img src={arrow} alt="" className={show ? "active" : ""} />
      </div>
    );
  }
}

export default CurrencySwitcher;
