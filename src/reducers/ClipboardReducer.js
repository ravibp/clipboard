import initialState from "reducers/InitialState";
import * as actionKeys from "actions/ActionTypes";

export default function clipboardReducer(state = initialState, action) {
  switch (action.type) {
    case actionKeys.FETCH_NOTES_CATEGORIES:
      return {
        ...state,
        notesCategories: action.notesCategories
      };
    case actionKeys.SET_STORE_VARIABLE:
      return {
        ...state,
        [action.inputStoreVariable]: action.inputValue
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
    case actionKeys.RENDER_OLD_TEXT:
      const updatedTexts = state.texts;
      const index = state.texts.findIndex(x => x.id === action.textObj.id);
      updatedTexts[index] = action.textObj;
      return {
        ...state,
        texts: updatedTexts
      };

    default:
      return state;
  }
}
