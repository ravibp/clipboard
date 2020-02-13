import initialState from "./InitialState";
import * as actionKeys from "../actions/ActionTypes";

export default function clipboardReducer(state = initialState, action) {
  switch (action.type) {
    case actionKeys.SET_STORE_VARIABLE:
      return {
        ...state,
        [action.inputStoreVariable]: action.inputValue
      };
    case actionKeys.SET_TOGGLE_VALUE:
      return {
        ...state,
        [action.storeVariable]: action.booleanValue
      };

    case actionKeys.FETCH_TEXTS_DB:
      return {
        ...state,
        texts: action.texts
      };
    case actionKeys.MODAL_TOGGLE:
      return {
        ...state,
        modalFlag: !state.modalFlag,
        crudOperation: action.crudOperation
      };
    case actionKeys.SET_TEXT_DETAILS:
      return {
        ...state,
        textObj: action.textObj,
        updatedTextObj: action.updatedTextObj
      };
    case actionKeys.RENDER_TEXT:
      let updatedTexts = state.texts;
      let index = state.texts.findIndex(x => x.id === action.textObj.id);
      updatedTexts[index] = action.textObj;
      return {
        ...state,
        texts: updatedTexts
      };

    default:
      return state;
  }
}
