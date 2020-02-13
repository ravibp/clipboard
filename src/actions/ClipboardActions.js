import * as actionKeys from "./ActionTypes";
import { databaseRef } from "../config/Config";
import _ from "lodash";

export const setStoreVariable = (inputStoreVariable, inputValue) => ({
  type: actionKeys.SET_STORE_VARIABLE,
  inputStoreVariable,
  inputValue
});
export const toggleElement = (storeVariable, booleanValue) => ({
  type: actionKeys.SET_TOGGLE_VALUE,
  storeVariable,
  booleanValue
});

export const addTextDB = (textObject, user) => async dispatch => {
  databaseRef
    .child("users/" + user.uid + "/texts")
    .push()
    .set(textObject);
};
export const deleteTextDB = (textId, user) => async dispatch => {
  databaseRef.child("users/" + user.uid + "/texts/" + textId).remove();
};
export const updateTextDB = (textObj, user) => async dispatch => {
  databaseRef.child("users/" + user.uid + "/texts/" + textObj.id).set(textObj);
};

// action to update store corresponding to database data change
export const fetchTextsDB = user => async dispatch => {
  /* above function is not called on db data change, only below event data change listener is called */
  if (user) {
    databaseRef.child("users/" + user.uid + "/texts").on("value", snapshot => {
      let texts = [];
      _.map(snapshot.val(), (value, key) => {
        let textObj = {
          id: key,
          textValue: value.textValue,
          dateStamp: value.dateStamp ? value.dateStamp : null
        };
        texts.push(textObj);
      });
      dispatch({
        type: actionKeys.FETCH_TEXTS_DB,
        texts: texts
      });
    });
  }
};

export const modalToggle = crudOperation => {
  return {
    type: actionKeys.MODAL_TOGGLE,
    crudOperation
  };
};

export const setTextDetails = (textObj, updatedTextObj) => {
  return {
    type: actionKeys.SET_TEXT_DETAILS,
    textObj,
    updatedTextObj
  };
};
export const renderText = textObj => {
  return {
    type: actionKeys.RENDER_TEXT,
    textObj
  };
};
