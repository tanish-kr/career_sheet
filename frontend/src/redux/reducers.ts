import { combineReducers } from "redux";
import translationReducer from "./modules/translations";
import modalReducer from "./modules/modals";
import profileReducer from "./modules/profiles";

const rootReducer = combineReducers({
  translations: translationReducer,
  modals: modalReducer,
  profile: profileReducer,
});

export default rootReducer;
