import './App.css';
import React from "react";

class App extends React.Component {
    constructor(props) {
        super(props);

        // State of the App
        this.state = {
            currency: "$",
            cart: []
        }
    }

    render() {
        return (
            // Nav Bar component
            // Body Component
            <div className="app">
                App here
            </div>
        )
    }
}

export default App;
