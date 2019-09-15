import React from "react";
import "./Clipboard.scss";
import { MDBInput } from "mdbreact";
import { ReactComponent as IconClipboard } from "./assets/svg/IconClipboard.svg";

import toaster from "toasted-notes";
import "toasted-notes/src/styles.css"; // optional styles
import ContentEditable from "react-contenteditable";
import ModalPage from "./ModalPage";
import * as GLOBAL_CONSTANTS from "./GlobalConstants";
const FontAwesome = require("react-fontawesome");
const monthNames = GLOBAL_CONSTANTS.monthNames;
export function showPopupNotification(message, notificationStylesClass) {
  const notificationDiv = (
    <div className={notificationStylesClass + " notification-popup"}>
      {message}
    </div>
  );
  toaster.notify(notificationDiv, {
    duration: 2000
  });
}

class ClipboardApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputText: ""
    };
    this.updateFlag = false;
    this.newTextObj = "";
  }
  componentDidMount() {
    this.props.fetchTextsDB();
  }
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
      // showPopupNotification("Changes Saved!!! ", "notify-update");
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
    this.props.addTextDB(textObj);
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
    showPopupNotification("Successfully Copied!!! ", "notify-read");
  };
  updateText = (textId, event) => {
    let textObj = {
      id: textId,
      textValue: document.getElementById("text-"+textId).innerHTML,
      dateStamp: new Date().toLocaleString().split(",")
    };
    this.newTextObj = textObj;
    this.updateFlag = true;
  };
  enableTextEdit = textObj => {
    document.getElementById(`text-${textObj.id}`).contentEditable = true;
    document.getElementById(`text-${textObj.id}`).focus();
    this.props.setTextDetails(textObj, null);
    this.updateFlag = false;
  };
  deleteText = textId => {
    this.props.deleteTextDB(textId);
    showPopupNotification("Successfully Deleted!!! ", "notify-delete");
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

  render() {
    console.log("render", this.props.texts);
    return (
      <div className="clipboard-container row no-gutters">
        <div className="clipboard__heading col-12">
          <h1 id="test">My ClipBoard</h1>
        </div>
        <div className="clipboard__list col-12">
          <ul>
            {console.log("render ul", this.props.texts)}
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
                        onDoubleClick={this.deleteText.bind(this, text.id)}
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
                        className="text-value"
                        id={`text-${text.id}`}
                        html={text.textValue} // innerHTML of the editable div
                        disabled={true} // use true to disable editing
                        onKeyUp={this.updateText.bind(this, text.id)} // handle innerHTML change
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
              type="textarea"
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
                ? "btn blue-gradient"
                : "btn blue-gradient addText-btn submit-disabled"
            }
            onClick={this.createText}
          >
            Add Text
          </button>
        </div>
        <ModalPage {...this.props} deleteText={this.deleteText} />
      </div>
    );
  }
}
export default ClipboardApp;
