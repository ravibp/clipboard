import React from "react";
import "./Header.scss";
// import HamburgerMenu from "react-hamburger-menu";
import * as firebase from "firebase";
const isMobileOnly = window.innerWidth <= 767 ? true : false;

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="row no-gutters">
        <div className="col-9 col-md-6 header-title">
          <ul>
            <li>My Clipboard</li>
          </ul>
        </div>
        <div className="col-3 col-md-6 header-userInfo">
          <ul>
            <li>
              {!isMobileOnly && `Welcome `} {this.props.displayName}
            </li>
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
                    ? !isMobileOnly
                      ? "Login/ Signup"
                      : "Login"
                    : "Logout"}
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default Header;
