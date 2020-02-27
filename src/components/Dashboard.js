import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { renderAuthUI, ui } from "components/auth/Auth";
import { MDBBtn } from "mdbreact";
import "components/Dashboard.scss";

class Dashboard extends Component {
  componentDidMount() {
    renderAuthUI(ui);
  }
  render() {
    const { user, isOnline, offlineMsg } = this.props;
    if (!isOnline) {
      alert(offlineMsg);
    }
    if (user) return <Redirect to="/clipboard" />;
    return (
      <div className="dashboard-container row no-gutters">
        <div className="col-12">
          {!isOnline && <h6 className="devloped-by">{offlineMsg}</h6>}
          <h6 className="devloped-by">
            Developed by {process.env.REACT_APP_DEVELOPER_NAME}
          </h6>
          <h1 className="dashboard__heading">Welcome to My Clipboard App</h1>
        </div>
        <div className="col-12 dashboard__viewDemo-btn">
          <MDBBtn
            className={!isOnline && "noInternet-disabled"}
            color="mdb-color"
            onClick={() => {
              window.location.replace("/demo");
            }}
          >
            View Demo
          </MDBBtn>
        </div>

        <div
          className={`col-12 ${!isOnline && "noInternet-disabled"} `}
          id="firebaseui-auth-container"
        ></div>
      </div>
    );
  }
}
export default Dashboard;
