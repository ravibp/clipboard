import React, { Component } from "react";
import ClipboardConnector from "./connectors/ClipboardConnector";
import Dashboard from "components/Dashboard";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Detector } from "react-detect-offline";
import { authHandler } from "components/auth/Auth";
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
    spinnerComponent.style.display = "none";
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
      <Detector
        render={({ online }) => {
          const offlineMsg =
            "You are Offline, Please check your Internet Connection...";
          return (
            <BrowserRouter>
              <div className="App">
                <Switch>
                  <Route
                    exact
                    path="/"
                    render={() => <Dashboard user={this.state.user} isOnline={online} offlineMsg={offlineMsg}/>}
                  />
                  <Route
                    path="/demo"
                    render={() => <ClipboardConnector user={guestUser} isOnline={online}/>}
                  />
                  <Route
                    path="/clipboard"
                    render={() => <ClipboardConnector user={this.state.user} isOnline={online}/>}
                  />
                </Switch>
              </div>
            </BrowserRouter>
          );
        }}
      />
    );
  }
}

export default App;
