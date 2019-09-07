import React from "react";
import ReactDOM from "react-dom";
import Rebase from "re-base";
import * as firebase from "firebase/app";
import "firebase/database";
import { DB_CONFIG } from "./Config/config";
import "./Clipboard.scss";
// import { MDBMask, MDBView, MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { MDBInput } from "mdbreact";
var FontAwesome = require("react-fontawesome");

class Clipboard extends React.Component {
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
  }
  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
    console.log("event", event.target.value);
  };
  handleSubmit = () => {
    let textObj = {
      id: this.state.texts.length + 1,
      textValue: this.state.inputText
    };
    this.setState({
      inputText: ""
    });
    // put data to db
    this.db_texts.push().set(textObj);
  };
  componentWillMount() {
    const prevTexts = this.state.texts;

    // Data Snapshot, load db data into local state on page load and on each submit
    this.db_texts.on("child_added", snap => {
      // console.log("snap valu", snap.val());
      let textObj = {
        id: snap.val().id,
        textValue: snap.val().textValue // textValue from DB texts array.
      };
      prevTexts.push(textObj);
      this.setState({
        texts: prevTexts
      });
    });
  }
  componentWillUnmount() {}
  render() {
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
                    {text.textValue}
                  </li>
                );
              })}
          </ul>
        </div>
        <div className="clipboard__input col-12">
          <div className="clipboard__icon">
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
              // icon="pencil-alt"
              name="inputText"
              value={this.state.inputText}
              onChange={this.handleInputChange}
            />
          </div>
        </div>
        <div className="clipboard__submit col-12">
          <button type="button" onClick={this.handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    );
  }
}
export default Clipboard;
