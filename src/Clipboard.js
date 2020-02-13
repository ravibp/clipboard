import React from "react";
import { MDBInput } from "mdbreact";
import { ReactComponent as IconClipboard } from "./assets/svg/IconClipboard.svg";

import ContentEditable from "react-contenteditable";
import ModalPopup from "./ModalPopup";
import * as GLOBAL_CONSTANTS from "./GlobalConstants";
import { withRouter, Redirect } from "react-router-dom";

import Header from "./components/header/Header";
import showPopupNotification from "./common/ToasterNotification";
import Spinner from "./common/Spinner";
import "./Clipboard.scss";
import "./common/Scrollbar.scss";
import FilterResults from "react-filter-search";

const FontAwesome = require("react-fontawesome");
const monthNames = GLOBAL_CONSTANTS.monthNames;
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
    this.props.fetchTextsDB(this.props.user);
    let displayName = this.handleDisplayName(this.props.user);
    this.props.setStoreVariable("displayName", displayName);
    this.props.setStoreVariable("user", this.props.user);
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

  handleContentBlur = id => {
    document.getElementById(`text-${id}`).contentEditable = false;
    if (this.updateFlag === true) {
      this.props.setTextDetails(this.props.textObj, this.newTextObj);
      this.props.modalToggle("UPDATE");
    }
  };

  // CRUD Operations
  createText = () => {
    let textObj = {
      textValue: this.props.inputText,
      dateStamp: new Date().toLocaleString().split(",")
    };
    this.props.setStoreVariable("searchText", "");
    this.props.setStoreVariable("inputText", "");
    this.props.addTextDB(textObj, this.props.user).then(() => {
      let textId = this.props.texts[this.props.texts.length - 1].id;
      showPopupNotification("Successfully Added!!! ", "notify-create", textId);
    });
  };
  readText = textId => {
    window
      .getSelection()
      .selectAllChildren(document.getElementById(`text-${textId}`));
    document.execCommand("copy");

    // de-select current selection
    if (window.getSelection) {
      window.getSelection().removeAllRanges();
    } else if (document.selection) {
      document.selection.empty();
    }

    showPopupNotification("Successfully Copied!!! ", "notify-create", textId);
  };
  updateText = textId => {
    let textObj = {
      id: textId,
      textValue: document.getElementById("text-" + textId).innerHTML,
      dateStamp: new Date().toLocaleString().split(",")
    };
    this.newTextObj = textObj;
    this.props.renderText(textObj);
    this.updateFlag = true;
  };
  enableTextEdit = textObj => {
    document.getElementById(`text-${textObj.id}`).contentEditable = true;
    document.getElementById(`text-${textObj.id}`).focus();
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
      this.props.toggleElement("expandSearchBox", false);
    }
  }

  componentWillUnmount() {
    if (isMobileOnly) {
      document.removeEventListener("mousedown", this.handleClickOutside);
    }
  }

  render() {
    console.log("render", this.props.user, this.props.texts);

    if (!this.props.user) return <Redirect to="/" />;
    else if (this.props.texts === null) {
      return <Spinner />;
    }
    return (
      <div className="clipboard-container row no-gutters">
        <div id="hamburgerOverlay-ref" className="hamburger-overlay"></div>
        <div className="clipboard__header col-12">
          <Header {...this.props} />
        </div>

        <div className="clipboard__input col-12">
          <div className="clipboard__inputIcon">
            <FontAwesome
              className="super-crazy-colors"
              name="pencil"
              size="2x"
              spin
              style={{ textShadow: "0 1px 0 rgba(0, 0, 0, 0.1)" }}
            />
          </div>
          <div className="col-12 clipboard__textArea">
            <MDBInput
              id="textarea-char-counter"
              type="textarea"
              label="Type something here..."
              rows="2"
              name="inputText"
              value={this.props.inputText.toString()}
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
              this.props.inputText.length > 0
                ? "btn addText-btn-color"
                : "btn addText-btn-color addText-btn submit-disabled"
            }
            onClick={this.createText}
          >
            Add Text
          </button>
        </div>
        <div className="clipboard__searchBox">
          <span
            onClick={e => {
              if (isMobileOnly) {
                this.props.toggleElement(
                  "expandSearchBox",
                  !this.props.expandSearchBox
                );
                document.getElementById(`searchText`).focus();
              }
            }}
            className="search-icon fa fa-search"
          />
          {!isMobileOnly && (
            <input
              id="searchText"
              name="searchText"
              placeholder="Search Notes"
              type="text"
              value={this.props.searchText}
              onChange={e =>
                this.props.setStoreVariable(e.target.name, e.target.value)
              }
            />
          )}
        </div>
        {isMobileOnly && (
          <div
            className="clipboard__searchInput"
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
        <div className="clipboard__list col-12">
          {this.props.texts && this.props.texts.length === 0 && (
            <p>Your Clipboard is empty!</p>
          )}
          <FilterResults
            value={this.props.searchText}
            data={this.props.texts}
            renderResults={texts => {
              texts.reverse();
              return (
                <>
                  {texts && texts.length === 0 && (
                    <p className="no-search-results">No results found!</p>
                  )}
                  <ul>
                    {texts.map((text, index) => {
                      const d = new Date();
                      const dateVariable = text.dateStamp
                        ? `
                        ${text.dateStamp[0].slice(0, 2)} 
                        ${monthNames[d.getMonth()]} 
                          ${text.dateStamp[0].slice(-4)},   
                            ${text.dateStamp[1].slice(0, -3)}
                      `
                        : "";
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
                              id={`text-${text.id}`}
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
                          <div className="dateStamp">{dateVariable}</div>
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
