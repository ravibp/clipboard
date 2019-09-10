import React from "react";
//firebase imports
import * as firebase from "firebase/app";
import "firebase/database";
import { DB_CONFIG } from "./Config/config";
import "./Clipboard.scss";
// import { MDBMask, MDBView, MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { MDBInput } from "mdbreact";
import Clipboard from "react-clipboard.js";
import { ReactComponent as IconClipboard } from "./assets/svg/IconClipboard.svg";

import toaster from "toasted-notes";
import "toasted-notes/src/styles.css"; // optional styles
import ContentEditable from "react-contenteditable";

const FontAwesome = require("react-fontawesome");

class ClipboardApp extends React.Component {
  constructor(props) {
    super(props);
    // this.app = firebase.initializeApp(DB_CONFIG);
    // this.db_texts = this.app
    //   .database()
    //   .ref()
    //   .child("texts"); // refers to db.collection.texts field

    this.state = {
      inputText: "",
      texts: []
    };
  }

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleSubmit = () => {
    let textObj = {
      id: this.state.texts.length + 1,
      textValue: this.state.inputText,
      dateStamp: new Date().toLocaleString().split(",")
    };
    let temp = this.state.texts;
    temp.push(textObj);
    this.setState({
      inputText: "",
      texts: temp
    });
    /* put data to db */

    // this.db_texts.push().set(textObj);
    // this.db_texts.update({
    //   [1]:{
    //     ...this.state.items[1],
    //     textValue: "success"
    //   }
    // })
  };
  // componentWillMount() {
  //   const prevTexts = this.state.texts;

  //   // Data Snapshot, load db data into local state on page load and on each submit
  //   this.db_texts.on("child_added", snap => {
  //     let textObj = {
  //       id: snap.val().id,
  //       textValue: snap.val().textValue, // textValue from DB texts array.
  //       dateStamp: snap.val().dateStamp
  //     };
  //     prevTexts.push(textObj);
  //     this.setState({
  //       texts: prevTexts
  //     });
  //   });
  // }
  componentWillUnmount() {}
  onSuccess = () => {
    const notificationDiv = (
      <div className="notification-popup">Successfully Copied!!!</div>
    );

    toaster.notify(notificationDiv, {
      duration: 500
    });
  };
  handleChange = (id, event) => {
    let updatedText = this.state.texts;
    if (updatedText.length > 0) {
      updatedText[id - 1].textValue = event.target.value;
      this.setState(
        {
          texts: updatedText
        },
        () => {
          /* update text to db */

          // let textObj = {
          //   id: this.state.texts.length + 1,
          //   textValue: this.state.inputText,
          //   dateStamp: new Date().toLocaleString().split(",")
          // };
          // let temp = this.state.texts;
          // temp.push(textObj);
          this.setState({
            inputText: ""
            // texts: temp
          });
        }
      );
    }
  };
  handleBlur = id => {
    document.getElementById(`text-${id}`).contentEditable = false;
  };
  handleDoubleclick = id => {
    document.getElementById(`text-${id}`).contentEditable = true;
    document.getElementById(`text-${id}`).focus();
  };
  handleEdit = id => {
    document.getElementById(`text-${id}`).contentEditable = true;
    document.getElementById(`text-${id}`).focus();
  };
  render() {
    console.log("render", this.state);
    return (
      <div className="clipboard-container row no-gutters">
        <div className="clipboard__heading col-12">
          <h1>My ClipBoard</h1>
        </div>
        <div className="clipboard__list col-12">
          <ul>
            {this.state.texts.length > 0 &&
              this.state.texts.map((text, index) => {
                return (
                  <li key={index}>
                    <span className="text-id">{text.id}.</span>
                    <span className="edit-icon">
                      <FontAwesome
                        onClick={this.handleEdit.bind(this, text.id)}
                        className="super-crazy-colors"
                        name="edit"
                        size="2x"
                        style={{ textShadow: "0 1px 0 rgba(0, 0, 0, 0.1)" }}
                      />
                    </span>
                    <span className="clipboard-icon">
                      <Clipboard
                        data-clipboard-text={text.textValue}
                        onSuccess={this.onSuccess}
                      >
                        <IconClipboard />
                      </Clipboard>
                    </span>
                    <div className="contentEditable-wrapper">
                      <ContentEditable
                        // innerRef={`textRef-${text.id}`}
                        onDoubleClick={this.handleDoubleclick.bind(
                          this,
                          text.id
                        )}
                        contentEditable={false}
                        className="text-value"
                        id={`text-${text.id}`}
                        html={text.textValue} // innerHTML of the editable div
                        disabled={true} // use true to disable editing
                        onChange={this.handleChange.bind(this, text.id)} // handle innerHTML change
                        onBlur={this.handleBlur.bind(this, text.id)}
                        tagName="pre" // Use a custom HTML tag (uses a div by default)
                      />
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
            onClick={this.handleSubmit}
          >
            Add Text
          </button>
        </div>
      </div>
    );
  }
}
export default ClipboardApp;
