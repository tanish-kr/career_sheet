import React, { FC } from "react";
import "./App.css";
import "../scss/App.scss";
import "../locales/config";
import "bulma/css/bulma.min.css";
import { Section } from "react-bulma-components";
import { NavigationComponent } from "./components/Navigation";
import { Profile } from "./components/Profile";

const App: FC = () => {
  return (
    <>
      <NavigationComponent />
      <Section>
        <Profile />
      </Section>
    </>
  );
};

export default App;
