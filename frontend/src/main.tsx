import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.tsx'
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store";
import { I18nextProvider } from "react-i18next";
import { i18n } from "./locales/config";
import { PersistGate } from "redux-persist/integration/react";
import App from "./layout/App";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </I18nextProvider>
    </Provider>
  </StrictMode>,
)
