import React, { useState, useEffect } from 'react';
import './App.css';
import "../locales/config";
import { useTranslation } from "react-i18next";

function App() {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState("ja");

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang, i18n]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>{t("app.title")}</h1>
        <button onClick={() => setLang(lang === "en" ? "ja" : "en")}>
          {t("switch_language")}
        </button>
      </header>
    </div>
  );
}

export default App;
