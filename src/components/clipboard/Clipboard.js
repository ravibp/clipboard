import React from "react";

import { withRouter, Redirect } from "react-router-dom";

import Header from "components/header/Header";
import NotesCategories from "components/clipboard/NotesCategories";
import NotesInput from "components/clipboard/NotesInput";
import NotesList from "components/clipboard/NotesList";
import ModalPopup from "components/modal/ModalPopup";
import Spinner from "common/Spinner";
import "components/clipboard/Clipboard.scss";
import "common/CommonStyles.scss";

const isMobileOnly = window.innerWidth <= 767 ? true : false;

class Clipboard extends React.Component {

  componentDidMount() {
    if (isMobileOnly) {
      document.addEventListener("mousedown", this.handleClickOutside);
    }
    this.props.fetchNotesCategoriesDB(this.props.user);
    this.props.fetchTextsDB(this.props.user, this.props.selectedNotesCategory);
    const displayName = this.handleDisplayName(this.props.user);
    this.props.setStoreVariable("displayName", displayName);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.notesCategories !== this.props.notesCategories &&
      this.props.notesCategories.length > 0 &&
      !this.props.selectedNotesCategory
    ) {
      this.props.setStoreVariable(
        "selectedNotesCategory",
        this.props.notesCategories[0]
      );
      this.props.fetchTextsDB(this.props.user, this.props.notesCategories[0]);
    }
  }

  componentWillUnmount() {
    if (isMobileOnly) {
      document.removeEventListener("mousedown", this.handleClickOutside);
    }
  }

  capitalizeFirstLetter = string => {
    return string.replace(/^./, string[0].toUpperCase());
  };

  handleDisplayName = user => {
    let displayName = "";
    if (user !== null) {
      if (user.displayName) {
        displayName = user.displayName;
      } else if (user.email) {
        displayName = this.capitalizeFirstLetter(user.email.split("@")[0]);
      } else if (user.phoneNumber) {
        displayName = user.phoneNumber;
      } else {
        displayName = "Anonymous User";
      }
    }
    return displayName;
  };

  /**
   * Toggle on Clicking outside of element
   */
  handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.setStoreVariable(
        "expandSearchBox",
        false
      );
    }
  }

  render() {
    const {
      texts,
      user,
      expandInputBox
    } = this.props;
    if (!user) return <Redirect to="/" />;
    else if (texts === null) {
      return <Spinner />;
    }
    return (
      <div className="clipboard-container row no-gutters">
        <div id="hamburgerOverlay-ref" className="hamburger-overlay"></div>
        <div className="clipboard__header col-12">
          <Header {...this.props} isMobileOnly={isMobileOnly} />
        </div>
        <div className="clipboard__notesCategories col-12">
          <NotesCategories {...this.props} />
        </div>
        {expandInputBox && (
          <NotesInput {...this.props} />
        )}
        <div className="clipboard__list col-12">
          <NotesList {...this.props} />
        </div>
        <ModalPopup {...this.props} />
      </div>
    );
  }
}
export default withRouter(Clipboard);
