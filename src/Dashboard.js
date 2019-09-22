import React, { Component } from "react";

import * as firebase from "firebase";
import * as firebaseui from "firebaseui";
import { Redirect } from "react-router-dom";
import { renderAuthUI, ui } from "./auth/Auth";
import { MDBBtn } from "mdbreact";
import "./Dashboard.scss";
import Spinner from "./common/Spinner";

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
      <div className="dashboard-container row no-gutters">
        {/* <div className="col-12"><Spinner/></div> */}
        <div className="col-12">
          <h1 className="dashboard__heading">Welcome to My Clipboard App</h1>
        </div>
        <div className="col-12">
          <MDBBtn
            color="mdb-color"
            onClick={() => {
              window.location.replace("/demo");
            }}
          >
            View Demo
          </MDBBtn>
        </div>

        <div className="col-12" id="firebaseui-auth-container"></div>
        <div className="col-12" id="loader"><Spinner/></div>
      </div>
    );
  }
}
export default Dashboard;
