import * as actionKeys from "actions/ActionTypes";
import { databaseRef } from "config/Config";
import _ from "lodash";
import showPopupNotification, {
  highlightOperationOnText
} from "common/ToasterNotification";

/**
 * ACTIONS TO PERFORM CRUD ON NOTES CATEGORIES.
 */
export const addNotesCategoryDB = (
  user,
  encodedCategoryText
) => async dispatch => {
  const textObj = {
    textValue: `This is <b>${decodeURIComponent(
      encodedCategoryText
    )}</b> category notes`,
    dateStamp: new Date().toLocaleString().split(",")
  };
  if (user) {
    const dbEndPoint = `users/${user.uid}/${encodedCategoryText}/texts`;
    dispatch(setStoreVariable("notesCategoryInputText", ""));
    databaseRef
      .child(dbEndPoint)
      .push()
      .set(textObj, () => {
        dispatch(
          setStoreVariable("selectedNotesCategory", encodedCategoryText)
        );
        dispatch(fetchTextsDB(user, encodedCategoryText));
        showPopupNotification("Successfully Added!!! ", "notify-create");
      });
  }
};
export const deleteNotesCategoryDB = (
  user,
  selectedNotesCategory,
  selectedNotesCategoryID
) => async dispatch => {
  if (user) {
    const dbEndPoint = `users/${user.uid}/${selectedNotesCategory}`;
    dispatch(modalToggle());
    highlightOperationOnText(selectedNotesCategoryID, "notify-delete");
    setTimeout(() => {
      databaseRef.child(dbEndPoint).remove(() => {
        dispatch(setStoreVariable("selectedNotesCategory", "Default"));
        dispatch(fetchTextsDB(user, "Default"));
        showPopupNotification("Successfully Deleted!!! ", "notify-delete");
      });
    }, 1000);
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

/**
 * ACTIONS TO PERFORM CRUD ON NOTES OF A PARTICULAR CATEGORY.
 */

export const addTextDB = (
  textObject,
  user,
  selectedNotesCategory
) => async dispatch => {
  const dbEndPoint = `users/${user.uid}/${
    selectedNotesCategory !== null ? `${selectedNotesCategory}/` : ""
  }texts`;
  dispatch(setStoreVariable("searchText", ""));
  dispatch(setStoreVariable("inputText", ""));
  databaseRef
    .child(dbEndPoint)
    .push(textObject)
    .then(snap => {
      highlightOperationOnText(snap.key, "notify-create");
      showPopupNotification("Successfully Added!!! ", "notify-create");
    });
};
export const deleteTextDB = (
  textID,
  user,
  selectedNotesCategory
) => async dispatch => {
  const dbEndPoint = `users/${user.uid}/${
    selectedNotesCategory !== null ? `${selectedNotesCategory}/` : ""
  }texts/${textID}`;

  dispatch(modalToggle());
  highlightOperationOnText(textID, "notify-delete");
  setTimeout(() => {
    databaseRef.child(dbEndPoint).remove(() => {
      showPopupNotification("Successfully Deleted!!! ", "notify-delete");
    });
  }, 1000);
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
    highlightOperationOnText(textObj.id, "notify-edit");
    showPopupNotification("Changes Saved!!! ", "notify-update");
  });
};

// action to update store corresponding to database data change
export const fetchTextsDB = (user, selectedNotesCategory) => async dispatch => {
  /* above function is not called on db data change, only below event data change listener is called */
  if (user) {
    dispatch(setStoreVariable("loadingFlag", true));
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
      dispatch(setStoreVariable("loadingFlag", false));
    });
  }
};

// Action to dynamically update store variables with a single action name.
export const setStoreVariable = (inputStoreVariable, inputValue) => ({
  type: actionKeys.SET_STORE_VARIABLE,
  inputStoreVariable,
  inputValue
});

// Action to toggle modal flag.
export const modalToggle = crudOperation => {
  return {
    type: actionKeys.MODAL_TOGGLE,
    crudOperation
  };
};

// Action to update text object.
export const setTextDetails = (textObj, updatedTextObj) => {
  return {
    type: actionKeys.SET_TEXT_DETAILS,
    textObj,
    updatedTextObj
  };
};

// Action to update old text object on cancelling text update.
export const renderOldText = textObj => {
  return {
    type: actionKeys.RENDER_OLD_TEXT,
    textObj
  };
};
