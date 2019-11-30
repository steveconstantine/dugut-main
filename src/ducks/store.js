/* -------------- REDUX STORE SETUP -------------- */
import { createStore } from "redux";
import appReducer from "./reducers";
import { devToolsEnhancer } from 'redux-devtools-extension';

const initialState = {
  dashboard: {
    greetingInfo: {
      greeting: "Hey there",
      subgreeting: "Great to have you here."
    },
    toastInfo: {
      iconName: "lightbulb",
      backgroundColor: "primary",
      contents: "Welcome back! Everything you need as an attendee is here."
    }
  }
};
const appStore = createStore(appReducer, initialState, devToolsEnhancer());

export default appStore;
