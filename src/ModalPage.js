import React, { Component } from "react";
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter
} from "mdbreact";

class ModalPage extends Component {
 
  handleConfirmNo = () => {
    const crudOperation = this.props.crudOperation;
      switch (crudOperation) {
      case "DELETE":
        this.props.modalToggle();
        break;
      case "UPDATE":
        this.props.renderText(this.props.textObj)
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
        this.props.deleteText(
          this.props.textObj ? this.props.textObj.id : null
        );
        this.props.modalToggle();
        break;
      case "UPDATE":
        this.props.updateTextDB(this.props.updatedTextObj, this.props.user);
        this.props.modalToggle();
        document.getElementById("text-"+this.props.updatedTextObj.id).style.animation = "sucessAnimation 2s";
        break;
      default:
        this.props.modalToggle();
    }
  };
  render() {
    return (
      <MDBContainer>
        <MDBModal
          isOpen={this.props.modalFlag}
          modalToggle={this.props.modalToggle}
        >
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
    );
  }
}
export default ModalPage;
