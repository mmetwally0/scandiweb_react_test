import React from "react";
import { Query } from "@apollo/client/react/components";
import { ALL_CURRENCIES } from "../queries";
import ClickOutsideToClose from "../clickOutsideToClose";

class CurrencySwitcher extends ClickOutsideToClose {
  constructor(props) {
    super(props);

    this.state = {
      show: false, // Show menu or not
    };
  }

  // If clicked outside the menu, close it
  onClickOutside() {
    this.setState({ show: false });
    console.log("ok switcher");
  }

  render() {
    return (
      <div ref={this.ref}>
        <div
          onClick={() => {
            this.setState({ show: !this.state.show });
          }}
        >
          $
        </div>
        <Query query={ALL_CURRENCIES}>
          {({ loading, data }) => {
            // Wait until data is fetched before rendering anything
            if (loading) {
              return null;
            }

            if (!this.state.show) {
              return null;
            }

            return <div className="currency-switcher">currency</div>;
          }}
        </Query>
      </div>
    );
  }
}

export default CurrencySwitcher;
