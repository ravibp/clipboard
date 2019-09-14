import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ClipboardActions from '../actions/ClipboardActions';
import PropTypes from 'prop-types';
import React from 'react';
import Clipboard from "../Clipboard"

class ClipboardConnector extends React.Component {
  render() {
  return (
      <Clipboard {...this.props}/>
    )
  }

}
const mapStateToProps = (state) => {
  return {
    texts: state.clipboardReducer.texts,
    textObj: state.clipboardReducer.textObj,
    testValue: state.clipboardReducer.testValue,
    modalFlag: state.clipboardReducer.modalFlag
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setTestValue: (testValue) => dispatch(ClipboardActions.setTestValue(testValue)),
    addTextDB: (textObj) => dispatch(ClipboardActions.addTextDB(textObj)),
    deleteTextDB: (textId) => dispatch(ClipboardActions.deleteTextDB(textId)),
    fetchTextsDB: (textId) => dispatch(ClipboardActions.fetchTextsDB(textId)),
    updateTextDB: (textObj) => dispatch(ClipboardActions.updateTextDB(textObj)),
    modalToggle: (modalFlag) => dispatch(ClipboardActions.modalToggle(modalFlag)),
    setTextDetails: (textObj) => dispatch(ClipboardActions.setTextDetails(textObj)),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClipboardConnector);