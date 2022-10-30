import React from "react";

export class ClickOutsideToClose extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  handleClickOutside(e) {
    if (this.ref.current && !this.ref.current.contains(e.target)) {
      this.onClickOutside && this.onClickOutside();
    }
  }

  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside, true);
  }

  render() {
    return false;
  }
}

export default ClickOutsideToClose;
