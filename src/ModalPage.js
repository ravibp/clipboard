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
  render() {
    console.log("propsssss", this.props);
    return (
      <MDBContainer>
        {/* MODAL */}
        <MDBModal
          isOpen={this.props.modalFlag}
          modalToggle={this.props.modalToggle}
        >
          <MDBModalHeader toggle={this.props.modalToggle}>
            Confirm Delete???
          </MDBModalHeader>
          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={this.props.modalToggle}>
              NO
            </MDBBtn>
            <MDBBtn
              color="primary"
              onClick={() => {
                this.props.deleteText(
                  this.props.textObj ? this.props.textObj.id : null
                );
                this.props.modalToggle()
              }}
            >
              YES
            </MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>
    );
  }
}
export default ModalPage;
