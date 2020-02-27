import React, { PureComponent } from "react";
import { MDBBtn, MDBInput } from "mdbreact";

export default class NotesInput extends PureComponent {
  createText = () => {
    const textObj = {
      textValue: this.props.inputText,
      dateStamp: new Date().toLocaleString().split(",")
    };
    this.props.addTextDB(
      textObj,
      this.props.user,
      this.props.selectedNotesCategory
    );
  };
  render() {
    const { inputText } = this.props;

    return (
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
          <MDBBtn
            className={
              inputText.length > 0
                ? "btn addText-btn-color hover-effect"
                : "btn addText-btn-color addText-btn submit-disabled hover-effect"
            }
            color="primary"
            rounded
            onClick={this.createText}
          >
            Add Text
          </MDBBtn>
        </div>
      </>
    );
  }
}
