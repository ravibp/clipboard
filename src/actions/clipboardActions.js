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
  textsRef.child(textId).remove();
};

export const fetchTextsDB = () => async dispatch => {
  let texts = [];
  textsRef.on("value", snapshot => {
    _.map(snapshot.val(), (value, key) => {
      console.log("fetchTextsDB action", value, key, "\n");
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
