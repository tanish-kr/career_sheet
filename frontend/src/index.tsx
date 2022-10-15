import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import { I18nextProvider } from "react-i18next";
import "./index.css";
import App from "./layout/App";
import * as serviceWorker from "./serviceWorker";
import { i18n } from "./locales/config";
import store, { persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </I18nextProvider>
    </Provider>
  </React.StrictMode>,
  rootElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
