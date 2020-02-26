import React from "react";
import { MDBInput } from "mdbreact";
import { ReactComponent as IconClipboard } from "./assets/svg/IconClipboard.svg";

import ContentEditable from "react-contenteditable";
import FilterResults from "react-filter-search";
import { withRouter, Redirect } from "react-router-dom";
import Moment from "react-moment";

import Header from "./components/header/Header";
import NotesCategories from "./NotesCategories";
import ModalPopup from "./ModalPopup";
import showPopupNotification from "./common/ToasterNotification";
import Spinner from "./common/Spinner";
import "./Clipboard.scss";
import "./common/Scrollbar.scss";

const FontAwesome = require("react-fontawesome");
const isMobileOnly = window.innerWidth <= 767 ? true : false;

class ClipboardApp extends React.Component {
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

  handleContentBlur = textID => {
    document.getElementById(this.computeTextID(textID)).contentEditable = false;
    if (this.updateFlag === true) {
      this.props.setTextDetails(this.props.textObj, this.newTextObj);
      this.props.modalToggle("UPDATE");
    }
  };

  // CRUD Operations
  createText = () => {
    const textObj = {
      textValue: this.props.inputText,
      dateStamp: new Date().toLocaleString().split(",")
    };
    console.log("textobj", textObj);

    this.props.setStoreVariable("searchText", "");
    this.props.setStoreVariable("inputText", "");
    this.props
      .addTextDB(textObj, this.props.user, this.props.selectedNotesCategory)
      .then(() => {
        if (this.props.texts && this.props.texts.length > 0) {
          // const textID = this.props.texts[this.props.texts.length - 1].id;
          showPopupNotification("Successfully Added!!! ", "notify-create");
        }
      });
  };
  readText = textID => {
    const computedTextID = this.computeTextID(textID);
    window
      .getSelection()
      .selectAllChildren(document.getElementById(computedTextID));
    document.execCommand("copy");

    // de-select current selection
    if (window.getSelection) {
      window.getSelection().removeAllRanges();
    } else if (document.selection) {
      document.selection.empty();
    }
    showPopupNotification("Successfully Copied!!! ", "notify-create");
  };
  computeTextID = textID => {
    const { selectedNotesCategory } = this.props;
    const computedTextID = `${
      selectedNotesCategory ? `${selectedNotesCategory}_` : ""
    }text-${textID}`;
    return computedTextID;
  };
  updateText = textID => {
    const textObj = {
      id: textID,
      textValue: document.getElementById(this.computeTextID(textID)).innerHTML,
      dateStamp: new Date().toLocaleString().split(",")
    };
    this.newTextObj = textObj;
    this.props.renderText(textObj);
    this.updateFlag = true;
  };
  enableTextEdit = textObj => {
    const computedTextID = this.computeTextID(textObj.id);
    document.getElementById(computedTextID).contentEditable = true;
    document.getElementById(computedTextID).focus();
    this.props.setTextDetails(textObj, null);
    this.updateFlag = false;
  };
  showEditCopyBtn = text => {
    return (
      <div className="icons-container">
        <span className="edit-icon">
          <FontAwesome
            onClick={this.enableTextEdit.bind(this, text)}
            className="super-crazy-colors"
            name="edit"
            size="2x"
            style={{ textShadow: "0 1px 0 rgba(0, 0, 0, 0.1)" }}
          />
        </span>
        <span className="clipboard-icon">
          <IconClipboard onClick={this.readText.bind(this, text.id)} />
        </span>
      </div>
    );
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
      selectedNotesCategory,
      texts,
      user,
      searchText,
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
          {texts && texts.length === 0 && <p>Your Clipboard is empty!</p>}
          <FilterResults
            value={searchText}
            data={texts}
            renderResults={texts => {
              texts.reverse();
              return (
                <>
                  {texts && texts.length === 0 && searchText && (
                    <p className="no-search-results">No results found!</p>
                  )}
                  <ul>
                    {texts.map((text, index) => {
                      return (
                        <li key={index + 1}>
                          <span className="text-id">{index + 1}.</span>
                          <span className="delete-icon">
                            <FontAwesome
                              onClick={() => {
                                this.props.setTextDetails(text, null);
                                this.props.modalToggle("DELETE");
                              }}
                              className="super-crazy-colors"
                              name="remove"
                              size="2x"
                              style={{
                                textShadow: "0 1px 0 rgba(0, 0, 0, 0.1)"
                              }}
                            />
                          </span>
                          {window.innerWidth > 767 &&
                            this.showEditCopyBtn(text)}
                          <div className="contentEditable-wrapper">
                            <ContentEditable
                              name="inputText"
                              onDoubleClick={this.enableTextEdit.bind(
                                this,
                                text
                              )}
                              contentEditable={false}
                              id={`${
                                selectedNotesCategory
                                  ? `${selectedNotesCategory}_`
                                  : ""
                              }text-${text.id}`}
                              className="text-value"
                              html={text.textValue} // innerHTML of the editable div
                              disabled={true} // use true to disable editing
                              onChange={this.updateText.bind(this, text.id)} // handle innerHTML change
                              onBlur={this.handleContentBlur.bind(
                                this,
                                text.id
                              )}
                              tagName="pre" // Use a custom HTML tag (uses a div by default)
                            />
                          </div>
                          {window.innerWidth <= 767 &&
                            this.showEditCopyBtn(text)}
                          <Moment
                            format="DD MMM YYYY, HH:mm"
                            className="dateStamp"
                            date={new Date()}
                          />
                        </li>
                      );
                    })}
                  </ul>
                </>
              );
            }}
          />
        </div>
        <ModalPopup {...this.props} />
      </div>
    );
  }
}
export default withRouter(ClipboardApp);
