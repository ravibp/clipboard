import React from "react";
import { MDBInput } from "mdbreact";

import { withRouter, Redirect } from "react-router-dom";

import Header from "./components/header/Header";
import NotesCategories from "./NotesCategories";
import ModalPopup from "./ModalPopup";
import NotesList from "./NotesList";
import Spinner from "./common/Spinner";
import "./Clipboard.scss";
import "./common/Scrollbar.scss";

const FontAwesome = require("react-fontawesome");
const isMobileOnly = window.innerWidth <= 767 ? true : false;

class Clipboard extends React.Component {
  constructor(props) {
    super(props);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.updateFlag = false;
    this.newTextObj = "";
  }

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

  // CRUD Operations
  createText = () => {
    const textObj = {
      textValue: this.props.inputText,
      dateStamp: new Date().toLocaleString().split(",")
    };

    this.props.setStoreVariable("searchText", "");
    this.props.setStoreVariable("inputText", "");
    this.props
      .addTextDB(textObj, this.props.user, this.props.selectedNotesCategory);
  };

  setWrapperRef(node) {
    this.wrapperRef = node;
  }
  /**
   * Toggle on Clicking outside of element
   */
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ hideSearch: true });
    }
  }

  componentWillUnmount() {
    if (isMobileOnly) {
      document.removeEventListener("mousedown", this.handleClickOutside);
    }
  }

  render() {
    const {
      texts,
      user,
      inputText,
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
          <Header {...this.props} />
        </div>
        <div className="clipboard__notesCategories col-12">
          <NotesCategories {...this.props} />
        </div>
        {expandInputBox && (
          <>
            <div className="clipboard__input col-12">
              <div className="clipboard__textArea">
                <MDBInput
                  id="textarea-char-counter"
                  type="textarea"
                  label="Type something here..."
                  rows="2"
                  name="inputText"
                  value={inputText.toString()}
                  onChange={e =>
                    this.props.setStoreVariable(e.target.name, e.target.value)
                  }
                />
              </div>
            </div>
            <div className="clipboard__submit col-12">
              <button
                type="button"
                className={
                  inputText.length > 0
                    ? "btn addText-btn-color"
                    : "btn addText-btn-color addText-btn submit-disabled"
                }
                onClick={this.createText}
              >
                Add Text
              </button>
            </div>
          </>
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
