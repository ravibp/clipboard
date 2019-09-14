import React from "react";
//firebase imports
import * as firebase from "firebase/app";
import "firebase/database";
import { DB_CONFIG } from "./Config/config";
import "./Clipboard.scss";
import { MDBInput } from "mdbreact";
import Clipboard from "react-clipboard.js";
import { ReactComponent as IconClipboard } from "./assets/svg/IconClipboard.svg";

import toaster from "toasted-notes";
import "toasted-notes/src/styles.css"; // optional styles
import ContentEditable from "react-contenteditable";

const FontAwesome = require("react-fontawesome");
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
class ClipboardApp extends React.Component {
  constructor(props) {
    super(props);
    this.app = firebase.initializeApp(DB_CONFIG);
    this.db_texts = this.app
      .database()
      .ref()
      .child("texts"); // refers to db.collection.texts field

    this.state = {
      inputText: "",
      texts: []
    };
    this.updateFlag = false;
  }

  componentWillMount() {
    const prevTexts = this.state.texts;

    // ADD to db snapshot
    this.db_texts.on("child_added", snap => {
      let textObj = {
        id: snap.key,
        textValue: snap.val().textValue, // textValue from DB texts array.
        dateStamp: snap.val().dateStamp
      };
      prevTexts.push(textObj);
      this.setState({
        texts: prevTexts
      });
    });

    // DELETE from db snapshot
    this.db_texts.on("child_removed", snap => {
      for (let i = 0; i < prevTexts.length; i++) {
        if (prevTexts[i].id == snap.key) {
          prevTexts.splice(i, 1);
        }
      }
      this.setState({
        texts: prevTexts
      });
    });
  }
  componentDidMount() {
    this.props.setTestValue("raviiiii works")
  }
  componentWillUnmount() {
    // remove connection
  }
  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  showPopupNotification = (message, notificationStylesClass) => {
    const notificationDiv = (
      <div className={notificationStylesClass + " notification-popup"}>
        {message}
      </div>
    );
    toaster.notify(notificationDiv, {
      duration: 2000
    });
  };

  handleContentBlur = id => {
    document.getElementById(`text-${id}`).contentEditable = false;
    if (this.updateFlag === true) {
      this.showPopupNotification("Changes Saved!!! ", "notify-update");
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
      id: this.state.texts.length + 1,
      textValue: this.state.inputText,
      dateStamp: new Date().toLocaleString().split(",")
    };
    this.setState({
      inputText: ""
    });
    this.db_texts.push().set(textObj);
    this.showPopupNotification("Successfully Added!!! ", "notify-create");
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
    this.showPopupNotification("Successfully Copied!!! ", "notify-read");
  };
  updateText = (textId, event) => {
    let textObj = {
      id: textId,
      textValue: event.target.value,
      dateStamp: new Date().toLocaleString().split(",")
    };
    firebase
      .database()
      .ref("texts/" + textId)
      .set(textObj);
    this.updateFlag = true;
  };
  enableTextEdit = id => {
    document.getElementById(`text-${id}`).contentEditable = true;
    document.getElementById(`text-${id}`).focus();
    this.updateFlag = false;
  };
  deleteText = textId => {
    firebase
      .database()
      .ref()
      .child("/texts/" + textId)
      .remove();
    this.showPopupNotification("Successfully Deleted!!! ", "notify-delete");
  };
  show = text => {
    return (
      <div className="icons-container">
        <span className="edit-icon">
          <FontAwesome
            onClick={this.enableTextEdit.bind(this, text.id)}
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
    return (
      <div className="clipboard-container row no-gutters">
        <div className="clipboard__heading col-12">
          <h1 id="test">My ClipBoard</h1>
        </div>
        <div className="clipboard__list col-12">
          <ul>
            {this.state.texts.length > 0 &&
              this.state.texts.map((text, index) => {
                const d = new Date();
                const dateVariable = (`
                  ${text.dateStamp[0].slice(0,2)} 
                  ${monthNames[d.getMonth()]} 
                    ${text.dateStamp[0].slice(-4)},   
                      ${text.dateStamp[1].slice(0, -3)}
                `) 
                return (
                  <li key={index + 1}>
                    <span className="text-id">{index + 1}.</span>
                    <span className="delete-icon">
                      <FontAwesome
                        onDoubleClick={this.deleteText.bind(this, text.id)}
                        onClick={() => {
                          if(window.innerWidth < 768) {
                            this.deleteText(text.id);
                          }
                        }}
                        className="super-crazy-colors"
                        name="remove"
                        size="2x"
                        style={{ textShadow: "0 1px 0 rgba(0, 0, 0, 0.1)" }}
                      />
                    </span>
                    {window.innerWidth > 767 && this.show(text)}
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
                        onChange={this.updateText.bind(this, text.id)} // handle innerHTML change
                        onBlur={this.handleContentBlur.bind(this, text.id)}
                        tagName="pre" // Use a custom HTML tag (uses a div by default)
                      />
                    </div>
                    {window.innerWidth <= 767 && this.show(text)}
                    <div className="dateStamp">
                          {dateVariable}
                    </div>
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
      </div>
    );
  }
}
export default ClipboardApp;
