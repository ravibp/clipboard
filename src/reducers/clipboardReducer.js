import initialState from './InitialState';
import * as actionKeys from '../actions/ActionTypes';

export default function clipboardReducer(state = initialState, action) {
  switch (action.type) {
    case actionKeys.SET_TEST_VALUE:
      return {
        ...state,
        testValue: action.testValue
      }
      case actionKeys.FETCH_TEXTS_DB:
        return {
          ...state,
          texts: action.texts
        }
    default:
      return state;
  }
}