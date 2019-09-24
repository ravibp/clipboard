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
    const crudOperation = this.props.crudOperation;
    switch (crudOperation) {
      case "DELETE":
        let textId = this.props.textObj ? this.props.textObj.id : null;
        this.props.deleteTextDB(textId, this.props.user);
        showPopupNotification("Successfully Deleted!!! ", "notify-delete");
        this.props.modalToggle();
        break;
      case "UPDATE":
        this.props.updateTextDB(this.props.updatedTextObj, this.props.user);
        this.props.modalToggle();
        document.getElementById(
          "text-" + this.props.updatedTextObj.id
        ).style.animation = "sucessAnimation 2s";
        showPopupNotification("Changes Saved!!! ", "notify-update");
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
