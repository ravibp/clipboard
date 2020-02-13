import { connect } from "react-redux";
import * as ClipboardActions from "../actions/ClipboardActions";
import React from "react";
import Clipboard from "../Clipboard";

class ClipboardConnector extends React.Component {
  render() {
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
    notesCategories: state.clipboardReducer.notesCategories,
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
    deleteTextDB: (textId, user, selectedNotesCategory) =>
      dispatch(
        ClipboardActions.deleteTextDB(textId, user, selectedNotesCategory)
      ),
    fetchTextsDB: (textId, user, selectedNotesCategory) =>
      dispatch(
        ClipboardActions.fetchTextsDB(textId, user, selectedNotesCategory)
      ),
    updateTextDB: (textObj, user, selectedNotesCategory) =>
      dispatch(
        ClipboardActions.updateTextDB(textObj, user, selectedNotesCategory)
      ),
    modalToggle: crudOperation =>
      dispatch(ClipboardActions.modalToggle(crudOperation)),
    setTextDetails: (textObj, updatedTextObj) =>
      dispatch(ClipboardActions.setTextDetails(textObj, updatedTextObj)),
    renderText: textObj => dispatch(ClipboardActions.renderText(textObj)),
    fetchNotesCategoriesDB: user =>
      dispatch(ClipboardActions.fetchNotesCategoriesDB(user)),
    addNotesCategoryDB: (user, selectedNotesCategory) =>
      dispatch(ClipboardActions.addNotesCategoryDB(user, selectedNotesCategory)),
    deleteNotesCategoryDB: (user, selectedNotesCategory) =>
      dispatch(ClipboardActions.deleteNotesCategoryDB(user, selectedNotesCategory)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ClipboardConnector);
