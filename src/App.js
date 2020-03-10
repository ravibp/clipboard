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
    authHandler(this); // authHandler updates 'user' state after authentication.
    this.showRenderedPage(); // Hide spinner on page load.
  }
  render() {
    const guestUser = {
      uid: "@Guest",
      displayName: "Guest User"
    };
    
    return (
      // Detector checks internet connectivity status.
      <Detector
        render={({ online }) => {
          const offlineMsg =
            "You are Offline, Please check your Internet Connection...";
          return (
            <BrowserRouter>
              <div className="App">
                <Switch>
                  {/* Route to /dashboard on page load. */}
                  <Route
                    exact
                    path="/"
                    render={() => <Dashboard user={this.state.user} isOnline={online} offlineMsg={offlineMsg}/>}
                  />
                  {/* Route to /demo for Guest User. */}
                  <Route
                    path="/demo"
                    render={() => <ClipboardConnector user={guestUser} isOnline={online}/>}
                  />
                  {/* Route to /clipboard for LoggedIn User. */}
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
