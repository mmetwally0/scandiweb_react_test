import React from "react";

class Alert extends React.Component {
  render() {
    return (
      this.props.show && (
        <>
          <div className="alert">{this.props.message}</div>
        </>
      )
    );
  }
}

export default Alert;
