import React, { Component } from "react";
import "./App.css";
import ClipboardConnector from "./connectors/ClipboardConnector";
import Dashboard from "./Dashboard";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { authHandler } from "./auth/Auth";
import "./App.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }
  showRenderedPage = () => {
    const spinnerComponent = document.querySelector("#spinner-loader");
    spinnerComponent.style.opacity = "0";
    spinnerComponent.style.transition = "opacity 1s";
  };
  async componentDidMount() {
    // authHandler updates userState after authentication.
    authHandler(this);
    this.showRenderedPage();
  }
  render() {
    const guestUser = {
      uid: "@Guest",
      displayName: "Guest User"
    };

    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route
              exact
              path="/"
              render={() => <Dashboard user={this.state.user} />}
            />
            <Route
              path="/demo"
              render={() => <ClipboardConnector user={guestUser} />}
            />
            <Route
              path="/clipboard"
              render={() => <ClipboardConnector user={this.state.user} />}
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
