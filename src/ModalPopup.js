import React, { Component } from "react";
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalHeader,
  MDBModalFooter
} from "mdbreact";
import "./ModalPopup.scss";

class ModalPopup extends Component {
  handleConfirmNo = () => {
    const crudOperation = this.props.crudOperation;
    switch (crudOperation) {
      case "UPDATE":
        this.props.renderOldText(this.props.textObj);
        this.props.modalToggle();
        break;
      case "DELETE-CATEGORY":
      case "DELETE":
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
    switch (crudOperation) {
      case "DELETE-CATEGORY":
        this.props.deleteNotesCategoryDB(user, selectedNotesCategory);
        break;
      case "DELETE":
        const textId = textObj ? textObj.id : null;
        this.props.deleteTextDB(textId, user, selectedNotesCategory);
        break;
      case "UPDATE":
        this.props.updateTextDB(updatedTextObj, user, selectedNotesCategory);
        break;
      default:
        this.props.modalToggle();
    }
  };
  render() {
    let crudVariable = ""
    const { crudOperation, selectedNotesCategory } = this.props
    switch (crudOperation) {
      case "DELETE-CATEGORY":
        crudVariable = `${crudOperation} ${selectedNotesCategory}`
        break;
      case "DELETE":
        crudVariable = `${crudOperation} Text`
        break;
      case "UPDATE":
        crudVariable = `${crudOperation} Text`
        break;
    }
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
              {`Confirm ${crudVariable} ???`}
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
