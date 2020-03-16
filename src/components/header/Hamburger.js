import React, { Component } from "react";
import HamburgerMenu from "react-hamburger-menu";
import LoginButton from "components/button/LoginButton";
import NotesCategories from "components/clipboard/NotesCategories";

export default class Hamburger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpenFlag: false
    };
    this.headerNavbarRef = React.createRef();
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.selectedNotesCategory &&
      prevProps.selectedNotesCategory !== this.props.selectedNotesCategory
    ) {
      setTimeout(() => {
        this.handleDrawerToggle();
      }, 500);
    }
  }
  handleDrawerToggle = () => {
    this.setState(
      prevState => {
        return { drawerOpenFlag: !prevState.drawerOpenFlag };
      },
      () => {
        if (this.state.drawerOpenFlag) {
          this.headerNavbarRef.current.style.left = "0px";
          this.props.hamburgerOverlayRef.current.style.backgroundColor =
            "#000000bd";
          this.props.hamburgerOverlayRef.current.style.width = "100vw";
        } else {
          this.headerNavbarRef.current.style.left = "800px";
          this.props.hamburgerOverlayRef.current.style.backgroundColor =
            "transparent";
            this.props.hamburgerOverlayRef.current.style.width = "0";
        }
      }
    );
  };
  /**
   * Toggle on Clicking outside of element
   */
  handleClickOutsideHamburgerDrawer = event => {
    if (
      this.headerNavbarRef &&
      !this.headerNavbarRef.current.contains(event.target) &&
      event.target.className
    ) {
      if (this.state.drawerOpenFlag) {
        this.handleDrawerToggle();
      }
    }
  };
  componentDidMount() {
    if (this.props.isMobileOnly) {
      document.addEventListener(
        "mousedown",
        this.handleClickOutsideHamburgerDrawer
      );
    }
  }
  componentWillUnmount() {
    if (this.props.isMobileOnly) {
      document.removeEventListener(
        "mousedown",
        this.handleClickOutsideHamburgerDrawer
      );
    }
  }

  render() {
    const { displayName, user } = this.props;
    const { drawerOpenFlag } = this.state;

    return (
      <>
        <div className="hamburgerMenu-icon">
          <HamburgerMenu
            name="aaaa"
            isOpen={drawerOpenFlag === undefined ? false : drawerOpenFlag}
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

        <div ref={this.headerNavbarRef} className="drawer">
          {user && user.uid && (
            <div>
              <LoginButton uid={user.uid} displayName={displayName} />
              <div className="mt-4">
                <NotesCategories {...this.props} />
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
}
