import * as actionKeys from "./ActionTypes";
import { databaseRef } from "../config/Config";
import _ from "lodash";

export const addNotesCategoryDB = (
  user,
  selectedNotesCategory
) => async dispatch => {
  const textObj = {
    id: selectedNotesCategory,
    textValue: `This is ${selectedNotesCategory} category notes`,
    dateStamp: new Date().toLocaleString().split(",")
  };
  if (user) {
    const dbEndPoint = `users/${user.uid}/${selectedNotesCategory}/texts`;
    databaseRef
      .child(dbEndPoint)
      .push()
      .set(textObj);
  }
};
export const deleteNotesCategoryDB = (
  user,
  selectedNotesCategory
) => async dispatch => {
  if (user) {
    const dbEndPoint = `users/${user.uid}/${selectedNotesCategory}`;
    databaseRef.child(dbEndPoint).remove();
  }
};
export const fetchNotesCategoriesDB = user => async dispatch => {
  if (user) {
    const dbEndPoint = `users/${user.uid}`;
    databaseRef.child(dbEndPoint).on("value", snapshot => {
      const dbNotesCategories = snapshot.val();
      const notesCategories = dbNotesCategories
        ? Object.keys(dbNotesCategories)
        : ["Default"];
      dispatch({
        type: actionKeys.FETCH_NOTES_CATEGORIES,
        notesCategories: notesCategories.sort()
      });
    });
  }
};
export const setStoreVariable = (inputStoreVariable, inputValue) => ({
  type: actionKeys.SET_STORE_VARIABLE,
  inputStoreVariable,
  inputValue
});

export const addTextDB = (
  textObject,
  user,
  selectedNotesCategory
) => async dispatch => {
  const dbEndPoint = `users/${user.uid}/${
    selectedNotesCategory !== null ? `${selectedNotesCategory}/` : ""
  }texts`;
  databaseRef
    .child(dbEndPoint)
    .push()
    .set(textObject);
};
export const deleteTextDB = (
  textId,
  user,
  selectedNotesCategory
) => async dispatch => {
  const dbEndPoint = `users/${user.uid}/${
    selectedNotesCategory !== null ? `${selectedNotesCategory}/` : ""
  }texts/${textId}`;
  databaseRef.child(dbEndPoint).remove();
};
export const updateTextDB = (
  textObj,
  user,
  selectedNotesCategory
) => async dispatch => {
  const dbEndPoint = `users/${user.uid}/${
    selectedNotesCategory !== null ? `${selectedNotesCategory}/` : ""
  }texts/${textObj.id}`;
  databaseRef.child(dbEndPoint).set(textObj);
};

// action to update store corresponding to database data change
export const fetchTextsDB = (user, selectedNotesCategory) => async dispatch => {
  /* above function is not called on db data change, only below event data change listener is called */
  if (user) {
    const dbEndPoint = `users/${user.uid}/${
      selectedNotesCategory !== null ? `${selectedNotesCategory}/` : ""
    }texts`;
    databaseRef.child(dbEndPoint).on("value", snapshot => {
      let texts = [];
      _.map(snapshot.val(), (value, key) => {
        const textObj = {
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
