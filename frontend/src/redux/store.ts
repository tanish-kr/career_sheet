import { configureStore } from "@reduxjs/toolkit";
import translationReducer from "./modules/translations";

const reducer = {
  translations: translationReducer,
};

const store = configureStore({
  reducer,
});

export default store;
