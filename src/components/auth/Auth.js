import firebase from "firebase/app";
import 'firebase/auth';
import * as firebaseui from "firebaseui";

export async function authHandler(thisProp) {
  await firebase.auth().onAuthStateChanged(user => {
    // User is signed in. Updates 'user' state
    thisProp.setState({
      user
    });
  });
}
export const ui = new firebaseui.auth.AuthUI(firebase.auth());

export function renderAuthUI(ui) {
  // Initialize the FirebaseUI Widget using Firebase.
  var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        return true;
      },
      uiShown: function() {
        // The widget is rendered.
        // Hide the loader.
        document.getElementById("spinner-loader").style.display = "none";
      }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: "popup",
    signInSuccessUrl: "/Clipboard",
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      // firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: "<your-tos-url>",
    // Privacy policy url.
    privacyPolicyUrl: "/"
  };

  // The start method will wait until the DOM is loaded.
  ui.start("#firebaseui-auth-container", uiConfig);
}
