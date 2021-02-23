import React, { FC } from "react";
import { Navbar } from "react-bulma-components";
import { TranslationComponent } from "../containers/Translation";
import { useTranslation } from "react-i18next";

export const NavigationComponent: FC = () => {
  const { t } = useTranslation();
  const titleStyle = { fontSize: "1.2em" };

  return (
    <Navbar color="dark">
      <Navbar.Brand className="is-justify-content-center is-flex-grow-1">
        <Navbar.Item>
          <h1 style={titleStyle}>{t("app.title")}</h1>
        </Navbar.Item>
      </Navbar.Brand>
      <Navbar.Container position="end">
        <Navbar.Item>
          <TranslationComponent />
        </Navbar.Item>
      </Navbar.Container>
    </Navbar>
  )
};
//
export default NavigationComponent;
