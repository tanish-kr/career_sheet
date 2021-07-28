import React, { FC } from "react";
import "./App.css";
import "../scss/App.scss";
import "../locales/config";
import "bulma/css/bulma.min.css";
import { Section } from "react-bulma-components";
import { NavigationComponent } from "./components/Navigation";
import { Profile } from "./components/Profile";
import { Skills } from "./components/Skills";

const App: FC = () => {
  return (
    <>
      <NavigationComponent />
      <Section>
        <Profile />
      </Section>
      <Section>
        <Skills />
      </Section>
    </>
  );
};

export default App;
