import * as actionKeys from "../actions/ActionTypes";
import { textsRef } from "../config/Config";
import _ from "lodash";

export const setTestValue = testValue => {
  return {
    type: actionKeys.SET_TEST_VALUE,
    testValue: testValue
  };
};

export const addTextDB = textObject => async dispatch => {
  textsRef.push().set(textObject);
};
export const deleteTextDB = textId => async dispatch => {
  textsRef.child("/" + textId).remove();
};
export const updateTextDB = textObj => async dispatch => {
  textsRef.child("/" + textObj.id).set(textObj);
};

// action to update store corresponding to database data change
export const fetchTextsDB = () => async dispatch => {
  /* above function is not called on db data change, only below event data change listener is called */

  textsRef.on("value", snapshot => {
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
};

export const modalToggle = () => {
  return {
    type: actionKeys.MODAL_TOGGLE,
  };
};

export const setTextDetails = (textObj) => {
    return {
      type: actionKeys.SET_TEXT_DETAILS,
      textObj: textObj
    };
  };
