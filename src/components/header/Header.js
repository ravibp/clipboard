import React from "react";
import "./Header.scss";
import Hamburger from "./Hamburger";
import { MDBInput } from "mdbreact";
import * as firebase from "firebase";
const isMobileOnly = window.innerWidth <= 767 ? true : false;

class Header extends React.Component {
  render() {
    const { user, displayName, expandInputBox } = this.props;
    const SignInOutButton = ({ uid, displayName }) => {
      return (
        <button
          onClick={() => {
            uid === "@Guest"
              ? window.location.replace("/") // redirect to dashboard route "/"
              : firebase.auth().signOut();
          }}
        >
          {uid === "@Guest" ? "Login/ Signup" : `Logout, ${displayName}`}
        </button>
      );
    };
    const toggleIconClass = !expandInputBox
      ? "fa fa-plus-circle"
      : "fa fa-minus-circle";
    return (
      <div className="row no-gutters header-container">
        <div className="col-auto header__title">
          <h1>My Clipboard</h1>
          <i
            onClick={() =>
              this.props.setStoreVariable(
                "expandInputBox",
                !this.props.expandInputBox
              )
            }
            className={`${toggleIconClass} inputToggleButton`}
            aria-hidden="true"
          ></i>
        </div>
        <div className="col-auto header__searchBox">
          <span
            onClick={e => {
              if (isMobileOnly) {
                this.props.setStoreVariable(
                  "expandSearchBox",
                  !this.props.expandSearchBox
                );
                document.getElementById(`searchText`).focus();
              }
            }}
            className="search-icon fa fa-search"
          />
          {!isMobileOnly && (
            <>
              <MDBInput
                id="searchText"
                name="searchText"
                label="Search Notes"
                rows="2"
                value={this.props.searchText}
                onChange={e =>
                  this.props.setStoreVariable(e.target.name, e.target.value)
                }
              />
            </>
          )}
          {isMobileOnly && (
            <div
              className="searchInput-container"
              style={{
                display: this.props.expandSearchBox ? "block" : "none"
              }}
            >
              <div className="search-arrow"></div>
              <input
                id="searchText"
                name="searchText"
                ref={this.setWrapperRef}
                placeholder="Search Notes"
                type="text"
                value={this.props.searchText}
                onChange={e =>
                  this.props.setStoreVariable(e.target.name, e.target.value)
                }
              />
            </div>
          )}
        </div>
        {isMobileOnly && (
          <>
            <div className="col header__hamburgerMenu">
              <Hamburger
                user={this.props.user}
                displayName={this.props.displayName}
                SignInOutButton={SignInOutButton}
              />
            </div>
          </>
        )}
        {!isMobileOnly && (
          <div className="col header__userInfo">
            <ul>
              <li>{`${displayName}`}</li>
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
