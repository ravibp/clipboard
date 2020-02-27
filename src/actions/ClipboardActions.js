import * as actionKeys from "./ActionTypes";
import { databaseRef } from "../config/Config";
import _ from "lodash";
import showPopupNotification from "../common/ToasterNotification";

export const addNotesCategoryDB = (
  user,
  selectedNotesCategory
) => async dispatch => {
  const textObj = {
    id: selectedNotesCategory,
    textValue: `This is <b>${decodeURIComponent(selectedNotesCategory)}</b> category notes`,
    dateStamp: new Date().toLocaleString().split(",")
  };
  if (user) {
    const dbEndPoint = `users/${user.uid}/${selectedNotesCategory}/texts`;
    databaseRef
      .child(dbEndPoint)
      .push()
      .set(textObj, () => {
        setStoreVariable("notesCategoryInputText", "");
        showPopupNotification("Successfully Added!!! ", "notify-create");
      });
  }
};
export const deleteNotesCategoryDB = (
  user,
  selectedNotesCategory
) => async dispatch => {
  if (user) {
    const dbEndPoint = `users/${user.uid}/${selectedNotesCategory}`;
    databaseRef.child(dbEndPoint).remove(() => {
      dispatch(modalToggle());
      showPopupNotification("Successfully Deleted!!! ", "notify-delete");
      dispatch(setStoreVariable("selectedNotesCategory", "Default"));
      dispatch(fetchTextsDB(user, "Default"));
    });
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
    .set(textObject, () => showPopupNotification("Successfully Added!!! ", "notify-create")
    );
};
export const deleteTextDB = (
  textId,
  user,
  selectedNotesCategory
) => async dispatch => {
  const dbEndPoint = `users/${user.uid}/${
    selectedNotesCategory !== null ? `${selectedNotesCategory}/` : ""
    }texts/${textId}`;
  databaseRef.child(dbEndPoint).remove(() => {
    dispatch(modalToggle());
    showPopupNotification("Successfully Deleted!!! ", "notify-delete");
  });
};
export const updateTextDB = (
  textObj,
  user,
  selectedNotesCategory
) => async dispatch => {
  const dbEndPoint = `users/${user.uid}/${
    selectedNotesCategory !== null ? `${selectedNotesCategory}/` : ""
    }texts/${textObj.id}`;
  databaseRef.child(dbEndPoint).set(textObj, () => {

    dispatch(modalToggle());
    showPopupNotification(
      "Changes Saved!!! ",
      "notify-update"
      // this.props.updatedTextObj.id,
    );
  });
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
export const renderOldText = textObj => {
  return {
    type: actionKeys.RENDER_OLD_TEXT,
    textObj
  };
};
