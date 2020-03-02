import firebase from "firebase/app";
import 'firebase/auth';
import React from "react";
import { MDBBtn } from "mdbreact";

const LoginButton = ({ uid, displayName }) => {
  return (
    <MDBBtn
      className="hover-effect"
      color="light-blue"
      style={{ margin: 0, padding: "10px" }}
      rounded
      onClick={() => {
        uid === "@Guest"
          ? window.location.replace("/") // redirect to dashboard route "/"
          : firebase.auth().signOut();
      }}
    >
      {uid === "@Guest" ? "Login/ Signup" : `Logout, ${displayName}`}
    </MDBBtn>
  );
};

export default LoginButton;
