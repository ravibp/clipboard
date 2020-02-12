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
    inputText: state.clipboardReducer.inputText
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleElement: (storeVariable, booleanValue) =>
      dispatch(ClipboardActions.toggleElement(storeVariable, booleanValue)),
      setText: (inputStoreVariable, inputValue) =>
      dispatch(ClipboardActions.setText(inputStoreVariable, inputValue)),
    addTextDB: (textObj, user) =>
      dispatch(ClipboardActions.addTextDB(textObj, user)),
    deleteTextDB: (textId, user) =>
      dispatch(ClipboardActions.deleteTextDB(textId, user)),
    fetchTextsDB: (textId, user) =>
      dispatch(ClipboardActions.fetchTextsDB(textId, user)),
    updateTextDB: (textObj, user) =>
      dispatch(ClipboardActions.updateTextDB(textObj, user)),
    modalToggle: crudOperation =>
      dispatch(ClipboardActions.modalToggle(crudOperation)),
    setTextDetails: (textObj, updatedTextObj) =>
      dispatch(ClipboardActions.setTextDetails(textObj, updatedTextObj)),
    renderText: textObj => dispatch(ClipboardActions.renderText(textObj))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ClipboardConnector);
