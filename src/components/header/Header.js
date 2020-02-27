import React from "react";
import "components/header/Header.scss";
import Hamburger from "components/header/Hamburger";
import { MDBInput } from "mdbreact";
import LoginButton from "components/button/LoginButton";
import FontAwesome from "react-fontawesome";

class Header extends React.Component {
  setWrapperRef = node => {
    this.wrapperRef = node;
  };
  renderRemoveIcon = () => (
    <FontAwesome
      name="remove"
      className="super-crazy-colors searchInput-clear ml-2"
      onClick={() => {
        this.props.setStoreVariable("searchText", "");
      }}
      style={{
        textShadow: "0 1px 0 rgba(0, 0, 0, 0.1)",
        color: "white"
      }}
    />
  );
  render() {
    const {
      user,
      displayName,
      expandInputBox,
      isMobileOnly,
      searchText
    } = this.props;

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
            className="search-icon fa fa-search"
            onClick={e => {
              if (isMobileOnly) {
                this.props.setStoreVariable(
                  "expandSearchBox",
                  !this.props.expandSearchBox
                );
                document.getElementById(`searchText`).focus();
              }
            }}
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
              {searchText && this.renderRemoveIcon()}
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
              {searchText && this.renderRemoveIcon()}
            </div>
          )}
        </div>
        {isMobileOnly && (
          <>
            <div className="col header__hamburgerMenu">
              <Hamburger
                user={this.props.user}
                displayName={this.props.displayName}
              />
            </div>
          </>
        )}
        {!isMobileOnly && (
          <div className="col header__userInfo">
            <ul>
              <li
                style={{
                  color: "#ff9800",
                  fontStyle: "italic",
                  fontFamily: "cursive"
                }}
              >{`${displayName}`}</li>
              {user && user.uid && (
                <li>
                  <LoginButton uid={user.uid} displayName={displayName} />
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
