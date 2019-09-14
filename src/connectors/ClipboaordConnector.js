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
    testValue: state.clipboardReducer.testValue
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setTestValue: (testValue) => dispatch(ClipboardActions.setTestValue(testValue))
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClipboardConnector);