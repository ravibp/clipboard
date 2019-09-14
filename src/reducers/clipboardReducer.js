import initialState from './InitialState';
import * as actionKeys from '../actions/actionTypes';

export default function clipboardReducer(state = initialState, action) {
  switch (action.type) {
    case actionKeys.SET_TEST_VALUE:
      return {
        ...state,
        testValue: action.testValue
      }
    default:
      return state;
  }
}