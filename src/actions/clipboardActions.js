import * as actionKeys from "../actions/ActionTypes";

export const setTestValue = (testValue) => {
  return {
    type: actionKeys.SET_TEST_VALUE,
    testValue: testValue
  };
};
