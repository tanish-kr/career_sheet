import { combineReducers } from "redux";
import translationReducer from "./modules/translations";
import modalReducer from "./modules/modals";
import profileReducer from "./modules/profiles";
import skillsReducer from "./modules/skills";
import qualificationsReducer from "./modules/qualifications";

const rootReducer = combineReducers({
  translations: translationReducer,
  modals: modalReducer,
  profile: profileReducer,
  skills: skillsReducer,
  qualifications: qualificationsReducer,
});

export default rootReducer;
