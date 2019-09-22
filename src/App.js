import React, { Component } from "react";
import "./App.css";
import ClipboardConnector from "./connectors/ClipboardConnector";
import Dashboard from "./Dashboard";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { authHandler } from "./auth/Auth";
import "./App.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userState: null
    };
  }
  componentDidMount() {
    authHandler(this);
  }
  render() {
    const guestUser = {
      uid: "@Guest",
      displayName: "Guest User",
    }
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route
              exact
              path="/"
              render={() => <Dashboard user={this.state.userState} />}
            />
            <Route
              path="/demo"
              render={() => <ClipboardConnector user={guestUser} />}
            />
            <Route
              path="/clipboard"
              render={() => <ClipboardConnector user={this.state.userState} />}
            />
            {/* <Route path='/create' component = {CreateProject} /> */}
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
