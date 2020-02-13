import React, { Component } from "react";
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalHeader,
  MDBModalFooter
} from "mdbreact";

import showPopupNotification from "./common/ToasterNotification";
import "./ModalPopup.scss";

class ModalPopup extends Component {
  handleConfirmNo = () => {
    const crudOperation = this.props.crudOperation;
    switch (crudOperation) {
      case "DELETE-CATEGORY":
        this.props.modalToggle();
        break;
      case "DELETE":
        this.props.modalToggle();
        break;
      case "UPDATE":
        this.props.renderText(this.props.textObj);
        this.props.modalToggle();
        break;
      default:
        this.props.modalToggle();
    }
  };
  handleConfirmYes = () => {
    const {
      updatedTextObj,
      user,
      selectedNotesCategory,
      crudOperation,
      textObj
    } = this.props;
    // const computedTextID = `${
    //   selectedNotesCategory ? `${selectedNotesCategory}_` : ""
    //   }text-${textObj.id}`;
    console.log("cruid, ", crudOperation);

    switch (crudOperation) {
      case "DELETE-CATEGORY":
        this.props.deleteNotesCategoryDB(user, selectedNotesCategory)
        this.props.setStoreVariable(
          "selectedNotesCategory",
          "Default"
        );
        this.props.fetchTextsDB(user, "Default");
      case "DELETE":
        const textId = textObj ? textObj.id : null;
        showPopupNotification(
          "Successfully Deleted!!! ",
          "notify-delete",
        );
        this.props.deleteTextDB(textId, user, selectedNotesCategory);
        this.props.modalToggle();
        break;
      case "UPDATE":
        this.props.updateTextDB(updatedTextObj, user, selectedNotesCategory);
        this.props.modalToggle();
        showPopupNotification(
          "Changes Saved!!! ",
          "notify-update"
          // this.props.updatedTextObj.id,
          // computedTextID
        );
        break;
      default:
        this.props.modalToggle();
    }
  };
  render() {
    return (
      <div className="modal-container">
        <MDBContainer>
          <MDBModal
            isOpen={this.props.modalFlag}
            toggle={this.props.modalToggle}
          >
            <button className="close-modal-btn">
              <span onClick={this.handleConfirmNo} aria-hidden="true">
                ×
              </span>
            </button>
            <MDBModalHeader toggle={this.props.modalToggle}>
              Confirm {this.props.crudOperation} ???
            </MDBModalHeader>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={this.handleConfirmNo}>
                NO
              </MDBBtn>
              <MDBBtn color="primary" onClick={this.handleConfirmYes}>
                YES
              </MDBBtn>
            </MDBModalFooter>
          </MDBModal>
        </MDBContainer>
      </div>
    );
  }
}
export default ModalPopup;
