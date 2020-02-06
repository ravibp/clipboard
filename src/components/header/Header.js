import React from "react";
import "./Header.scss";
import Hamburger from "./Hamburger";
import * as firebase from "firebase";
const isMobileOnly = window.innerWidth <= 767 ? true : false;

class Header extends React.Component {
  render() {
    return (
      <div className="row no-gutters">
        <div className="col-9 col-md-6 header-title">
          <ul>
            <li>My Clipboard</li>
          </ul>
        </div>
        {isMobileOnly && (
          <div className="hamburgerMenu">
            <Hamburger user={this.props.user} displayName={this.props.displayName}  />
          </div>
        )}
        {!isMobileOnly && (
          <div className="col-3 col-md-6 header-userInfo">
            <ul>
              <li>{`Welcome ${this.props.displayName}`}</li>
              {this.props.user && this.props.user.uid && (
                <li>
                  <button
                    onClick={() => {
                      let uid = this.props.user.uid;
                      uid === "@Guest" && window.location.replace("/");
                      uid !== "@Guest" && firebase.auth().signOut();
                    }}
                  >
                    {this.props.user.uid === "@Guest"
                      ? "Login/ Signup"
                      : "Logout"}
                  </button>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default Header;
