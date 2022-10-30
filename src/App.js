import "./App.css";
import React from "react";
import NavBar from "./components/NavBar";

class App extends React.Component {
  constructor(props) {
    super(props);

    // State of the App
    this.state = {
      currency: "$",
      cart: [],
    };
  }

  render() {
    return (
      // Nav Bar component
      // Body Component
      <>
        <NavBar />
      </>
    );
  }
}

export default App;
