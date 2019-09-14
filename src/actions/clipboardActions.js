import * as actionKeys from "../actions/actionTypes";

export const setTestValue = (testValue) => {
  return {
    type: actionKeys.SET_TEST_VALUE,
    testValue: testValue
  };
};
