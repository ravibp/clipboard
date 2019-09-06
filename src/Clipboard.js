import React from "react";
import ReactDOM from "react-dom";
import Rebase from "re-base";
import * as firebase from "firebase/app";
import "firebase/database";
import { DB_CONFIG } from "./Config/config";

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
      let textObj = {
        id: this.state.texts.length + 1,
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
      <div>
        <p>My ClipBoard</p>
        <input
          name="inputText"
          value={this.state.inputText}
          onChange={this.handleInputChange}
          type="text"
        />
        <div>
          <ul>
            {this.state.texts.length > 0 &&
              this.state.texts.map((text, index) => {
                return (
                  <li key={index}>
                    {text.id} {text.textValue}
                  </li>
                );
              })}
          </ul>
        </div>
        <button type="button" onClick={this.handleSubmit}>
          Submit
        </button>
      </div>
    );
  }
}
export default Clipboard;
