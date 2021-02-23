import React, { FC } from "react";
import "./App.css";
import "../locales/config";
import "bulma/css/bulma.min.css";
import { Section } from "react-bulma-components";
import { NavigationComponent } from "./components/Navigation";

const App: FC = () => {

  return (
    <>
      <NavigationComponent />
      <Section>
      </Section>
    </>
  );
};

export default App;
