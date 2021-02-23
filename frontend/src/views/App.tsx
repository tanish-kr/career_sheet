import React, { FC } from "react";
import "./App.css";
import "../locales/config";
import "bulma/css/bulma.min.css";
import { useTranslation } from "react-i18next";
import { Heading, Section } from "react-bulma-components";
import { TranslationComponent } from "./containers/Translation";

const App: FC = () => {
  const { t } = useTranslation();

  return (
    <Section>
      <Heading className="has-text-centered">{t("app.title")}</Heading>
      <TranslationComponent />
    </Section>
  );
};

export default App;
