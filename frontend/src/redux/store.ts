import { configureStore } from "@reduxjs/toolkit";
import translationReducer from "./modules/translations";
import modalReducer from "./modules/modals";
import profileReducer from "./modules/profiles";

const reducer = {
  translations: translationReducer,
  modals: modalReducer,
  profile: profileReducer,
};

const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
