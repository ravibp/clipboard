import { connect } from "react-redux";
import * as ClipboardActions from "actions/ClipboardActions";
import React from "react";
import Clipboard from "components/clipboard/Clipboard";
import { Redirect } from "react-router-dom";

class ClipboardConnector extends React.Component {
  render() {
    if (!this.props.isOnline) {
      return <Redirect to="/" />;
    }
    return <Clipboard {...this.props} />;
  }
}
const mapStateToProps = state => {
  return {
    texts: state.clipboardReducer.texts,
    textObj: state.clipboardReducer.textObj,
    updatedTextObj: state.clipboardReducer.updatedTextObj,
    testValue: state.clipboardReducer.testValue,
    modalFlag: state.clipboardReducer.modalFlag,
    crudOperation: state.clipboardReducer.crudOperation,
    expandSearchBox: state.clipboardReducer.expandSearchBox,
    expandInputBox: state.clipboardReducer.expandInputBox,
    searchText: state.clipboardReducer.searchText,
    inputText: state.clipboardReducer.inputText,
    notesCategoryInputText: state.clipboardReducer.notesCategoryInputText,
    displayName: state.clipboardReducer.displayName,
    selectedNotesCategory: state.clipboardReducer.selectedNotesCategory,
    selectedNotesCategoryID: state.clipboardReducer.selectedNotesCategoryID,
    notesCategories: state.clipboardReducer.notesCategories
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setStoreVariable: (inputStoreVariable, inputValue) =>
      dispatch(
        ClipboardActions.setStoreVariable(inputStoreVariable, inputValue)
      ),
    addTextDB: (textObj, user, selectedNotesCategory) =>
      dispatch(
        ClipboardActions.addTextDB(textObj, user, selectedNotesCategory)
      ),
    deleteTextDB: (textID, user, selectedNotesCategory) =>
      dispatch(
        ClipboardActions.deleteTextDB(textID, user, selectedNotesCategory)
      ),
    fetchTextsDB: (textID, user, selectedNotesCategory) =>
      dispatch(
        ClipboardActions.fetchTextsDB(textID, user, selectedNotesCategory)
      ),
    updateTextDB: (textObj, user, selectedNotesCategory) =>
      dispatch(
        ClipboardActions.updateTextDB(textObj, user, selectedNotesCategory)
      ),
    modalToggle: crudOperation =>
      dispatch(ClipboardActions.modalToggle(crudOperation)),
    setTextDetails: (textObj, updatedTextObj) =>
      dispatch(ClipboardActions.setTextDetails(textObj, updatedTextObj)),
    renderOldText: textObj => dispatch(ClipboardActions.renderOldText(textObj)),
    fetchNotesCategoriesDB: user =>
      dispatch(ClipboardActions.fetchNotesCategoriesDB(user)),
    addNotesCategoryDB: (user, selectedNotesCategory) =>
      dispatch(
        ClipboardActions.addNotesCategoryDB(user, selectedNotesCategory)
      ),
    deleteNotesCategoryDB: (
      user,
      selectedNotesCategory,
      selectedNotesCategoryID
    ) =>
      dispatch(
        ClipboardActions.deleteNotesCategoryDB(
          user,
          selectedNotesCategory,
          selectedNotesCategoryID
        )
      )
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ClipboardConnector);
