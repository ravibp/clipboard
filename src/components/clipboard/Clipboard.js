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
  fetchDataDB = () => {
    // fetch notes categories and texts from DB.
    this.props.fetchNotesCategoriesDB(this.props.user);
    this.props.fetchTextsDB(this.props.user, this.props.selectedNotesCategory);
    const displayName = this.handleDisplayName(this.props.user);
    this.props.setStoreVariable("displayName", displayName);
  };
  componentDidMount() {
    this.fetchDataDB();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user && this.props.user) {
      this.fetchDataDB();
    }
    // Fetch Default note category texts on deleting a particular note category.
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

  capitalizeFirstLetter = string => {
    return string.replace(/^./, string[0].toUpperCase());
  };

  // Format display name.
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

  render() {
    const { user, expandInputBox, loadingFlag } = this.props;
    // Redirect to dashboard if user is not logged in.
    if (!user) return <Redirect to="/" />;
    else if (loadingFlag) {
      return <Spinner />; // Show spinner during page load.
    }
    return (
      <div className="clipboard-container row no-gutters">
        {/* Header component. */}
        <div className="clipboard__header col-12">
          <Header {...this.props} isMobileOnly={isMobileOnly} />
        </div>
        {/* Notes category list component. */}
        {!isMobileOnly && (
          <div className="clipboard__notesCategories col-12">
            <NotesCategories {...this.props} />
          </div>
        )}
        {/* Notes input component for adding new notes categories. */}
        {expandInputBox && <NotesInput {...this.props} />}
        {/* Notes list component belonging to a particular note category. */}
        <div className="clipboard__list col-12">
          <NotesList {...this.props} />
        </div>
        {/* Modal popup component for confirm operations. */}
        <ModalPopup {...this.props} />
      </div>
    );
  }
}
export default withRouter(Clipboard);
