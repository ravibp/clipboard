import React, { Component } from "react";

import * as firebase from "firebase";
import * as firebaseui from "firebaseui";
import { Redirect } from "react-router-dom";
import { authHandler, renderAuthUI, ui } from "./auth/Auth";
import { MDBBtn } from "mdbreact";

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    renderAuthUI(ui);
  }
  render() {
    if (this.props.user) return <Redirect to="/clipboard" />;
    return (
      <div>
        <h1>Dashboard</h1>
        {/* <button id="recaptcha-container" name="authButton" type="button" onClick={this.onClick}>AuthBtn</button> */}
        <h1>Welcome to My Awesome App</h1>
        <MDBBtn color="mdb-color" onClick={()=>{window.location.replace('/demo')}}>View Demo</MDBBtn>
        <div id="firebaseui-auth-container"></div>
        <div id="loader">Loading...</div>
      </div>
    );
  }
}
export default Dashboard;
