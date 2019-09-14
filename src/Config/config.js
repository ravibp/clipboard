import * as firebase from 'firebase';

const DB_CONFIG = {
    apiKey: "AIzaSyAmtvUaZF1ZCga4zaJwtYKwi23shWphxEM",
    authDomain: "clipboard-application.firebaseapp.com",
    databaseURL: "https://clipboard-application.firebaseio.com",
    projectId: "clipboard-application",
    storageBucket: "",
    messagingSenderId: "819825292187",
    appId: "1:819825292187:web:8ddaf5a31a0a031bade73e"
  };

  firebase.initializeApp(DB_CONFIG);
  const databaseRef = firebase.database().ref();
  export const textsRef = databaseRef.child("texts")