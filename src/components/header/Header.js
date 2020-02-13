import React from "react";
import "./Header.scss";
import Hamburger from "./Hamburger";
import * as firebase from "firebase";
const isMobileOnly = window.innerWidth <= 767 ? true : false;

class Header extends React.Component {
  render() {
    let { user, displayName } = this.props;
    const SignInOutButton = ({ uid, displayName }) => {
      return (
        <button
          onClick={() => {
            uid === "@Guest"
              ? window.location.replace("/") // redirect to dashboard "/"
              : firebase.auth().signOut();
          }}
        >
          {uid === "@Guest" ? "Login/ Signup" : `Logout, ${displayName}`}
        </button>
      );
    };
    return (
      <div className="row no-gutters">
        <div className="col-9 col-md-6 header-title">
          <ul>
            <li>My Clipboard</li>
          </ul>
        </div>
        {isMobileOnly && (
          <div className="hamburgerMenu">
            <Hamburger
              user={this.props.user}
              displayName={this.props.displayName}
              SignInOutButton={SignInOutButton}
            />
          </div>
        )}
        {!isMobileOnly && (
          <div className="col-3 col-md-6 header-userInfo">
            <ul>
              <li>{`Welcome ${displayName}`}</li>
              {user && user.uid && (
                <li>
                  <SignInOutButton uid={user.uid} displayName={displayName} />
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
