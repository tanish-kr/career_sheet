import React, { FC, useState, useEffect } from "react";
import "./App.css";
import "../locales/config";
import "bulma/css/bulma.min.css";
import { useTranslation } from "react-i18next";
import { Button, Heading, Section } from "react-bulma-components";

const App: FC = () => {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState("ja");

  useEffect(() => {
    void i18n.changeLanguage(lang);
  }, [lang, i18n]);

  return (
    <Section>
      <Heading className="has-text-centered">{t("app.title")}</Heading>
      <Button onClick={() => setLang(lang === "en" ? "ja" : "en")}>
        {t("switch_language")}
      </Button>
    </Section>
  );
};

export default App;
