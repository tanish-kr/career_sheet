import { combineReducers } from "redux";
import translationReducer from "./modules/translations";
import modalReducer from "./modules/modals";
import profileReducer from "./modules/profiles";
import skillsReducer from "./modules/skills";
import qualificationsReducer from "./modules/qualifications";
import companiesReducer from "./modules/companies";
import projectsReducer from "./modules/projects";

const rootReducer = combineReducers({
  translations: translationReducer,
  modals: modalReducer,
  profile: profileReducer,
  skills: skillsReducer,
  qualifications: qualificationsReducer,
  companies: companiesReducer,
  projects: projectsReducer,
});

export default rootReducer;
