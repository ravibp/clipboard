import React from "react";
import { MDBInput } from "mdbreact";
import { ReactComponent as IconClipboard } from "./assets/svg/IconClipboard.svg";

import * as firebase from "firebase";
import ContentEditable from "react-contenteditable";
import ModalPopup from "./ModalPopup";
import * as GLOBAL_CONSTANTS from "./GlobalConstants";
import { withRouter, Redirect } from "react-router-dom";

import showPopupNotification from "./common/ToasterNotification";
import Spinner from "./common/Spinner";
import { MDBBtn } from "mdbreact";
import "./Clipboard.scss";
import "./common/Scrollbar.scss";

const FontAwesome = require("react-fontawesome");
const monthNames = GLOBAL_CONSTANTS.monthNames;

class ClipboardApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputText: "",
      userName: null
    };
    this.updateFlag = false;
    this.newTextObj = "";
  }
  componentDidMount() {
    this.props.fetchTextsDB(this.props.user);
    let displayName = this.handleDisplayName(this.props.user);
    this.setState({
      displayName
    });
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
      }
    }
    return displayName;
  };
  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleContentBlur = id => {
    document.getElementById(`text-${id}`).contentEditable = false;
    if (this.updateFlag === true) {
      this.props.setTextDetails(this.props.textObj, this.newTextObj);
      this.props.modalToggle("UPDATE");
    }
  };
  handleDoubleclick = id => {
    this.updateFlag = false;
    document.getElementById(`text-${id}`).contentEditable = true;
    document.getElementById(`text-${id}`).focus();
  };

  // CRUD Operations
  createText = () => {
    let textObj = {
      textValue: this.state.inputText,
      dateStamp: new Date().toLocaleString().split(",")
    };
    this.setState({
      inputText: ""
    });
    this.props.addTextDB(textObj, this.props.user);
    showPopupNotification("Successfully Added!!! ", "notify-create");
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
    showPopupNotification("Successfully Copied!!! ", "notify-create");
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
  deleteText = textId => {};
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

  render() {
    if (!this.props.user) return <Redirect to="/" />;
    else if (this.props.texts === null) {
      return <Spinner />;
    }
    return (
      <div className="clipboard-container row no-gutters">
        <div className="clipboard__heading col-12">
          <h1 id="test">My ClipBoard</h1>
          {this.state.displayName && (
            <h4>
              Welcome <span>{this.state.displayName}</span>
            </h4>
          )}

          {this.props.user && this.props.user.uid && (
            <MDBBtn
              color="mdb-color"
              className="homepage-btn mb-1"
              onClick={() => {
                let uid = this.props.user.uid;
                uid === "@Guest" && window.location.replace("/");
                uid !== "@Guest" && firebase.auth().signOut();
              }}
            >
              {this.props.user.uid === "@Guest" ? "Login/ Signup" : "Logout"}
            </MDBBtn>
          )}
          {this.props.texts.length === 0 && <p>Your Clipboard is empty!</p>}
        </div>
        <div className="clipboard__list col-12">
          <ul>
            {this.props.texts &&
              this.props.texts.length > 0 &&
              this.props.texts.map((text, index) => {
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
                        style={{ textShadow: "0 1px 0 rgba(0, 0, 0, 0.1)" }}
                      />
                    </span>
                    {window.innerWidth > 767 && this.showEditCopyBtn(text)}
                    <div className="contentEditable-wrapper">
                      <ContentEditable
                        name="inputText"
                        onDoubleClick={this.handleDoubleclick.bind(
                          this,
                          text.id
                        )}
                        contentEditable={false}
                        id={`text-${text.id}`}
                        className="text-value"
                        html={text.textValue} // innerHTML of the editable div
                        disabled={true} // use true to disable editing
                        onChange={this.updateText.bind(this, text.id)} // handle innerHTML change
                        onBlur={this.handleContentBlur.bind(this, text.id)}
                        tagName="pre" // Use a custom HTML tag (uses a div by default)
                      />
                    </div>
                    {window.innerWidth <= 767 && this.showEditCopyBtn(text)}
                    <div className="dateStamp">{dateVariable}</div>
                  </li>
                );
              })}
          </ul>
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
              value={this.state.inputText.toString()}
              onChange={this.handleInputChange}
            />
          </div>
        </div>
        <div className="clipboard__submit col-12">
          <button
            type="button"
            className={
              this.state.inputText.length > 0
                ? "btn addText-btn-color"
                : "btn addText-btn-color addText-btn submit-disabled"
            }
            onClick={this.createText}
          >
            Add Text
          </button>
        </div>
        <ModalPopup {...this.props} />
      </div>
    );
  }
}
export default withRouter(ClipboardApp);
