import React, { Component } from "react";
import HamburgerMenu from "react-hamburger-menu";

export default class Hamburger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpenFlag: false
    };
  }
  handleDrawerToggle = () => {
    this.setState(
      prevState => {
        return { drawerOpenFlag: !prevState.drawerOpenFlag };
      },
      () => {
        console.log("opem", this.state.drawerOpenFlag);

        if (this.state.drawerOpenFlag) {
          //   this.refs["headerNavBar-ref"].classList.remove("drawer");
          this.refs["headerNavBar-ref"].style.top = "0px";
          //   document.getElementById("hamburgerOverlay-ref").style.background =
          //     "#000000bd";
          //   document.getElementById("hamburgerOverlay-ref").style.zIndex = "100";
        } else {
          this.refs["headerNavBar-ref"].style.top = "-300px";
          //   document.getElementById("hamburgerOverlay-ref").style.zIndex = "0";
          //   document.getElementById("hamburgerOverlay-ref").style.background =
          //     "transparent";
        }
      }
    );
  };
  setWrapperRef = node => {
    this.wrapperRef = node;
  };
  /**
   * Toggle on Clicking outside of element
   */
  handleClickOutside = event => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      if (this.state.drawerOpenFlag) {
        this.handleDrawerToggle();
      }
    }
  };
  render() {

    return (
      <>
        <div className="hamburgerMenu__icon">
          <HamburgerMenu
            isOpen={
              this.state.drawerOpenFlag === undefined
                ? false
                : this.state.drawerOpenFlag
            }
            menuClicked={this.handleDrawerToggle}
            width={25}
            height={20}
            strokeWidth={3}
            rotate={0}
            color="white"
            borderRadius={0}
            animationDuration={0.5}
          />
        </div>

        <div ref="headerNavBar-ref" className="drawer">
          <div>
            {this.props.user.uid === "@Guest"
              ? "Login/ Signup"
              : `Sign out, ${this.props.displayName}?`}
          </div>
        </div>
      </>
    );
  }
}
