import React, { FC } from "react";
import "./App.css";
import "../scss/App.scss";
import "../locales/config";
import "bulma/css/bulma.min.css";
import { Section, Tile, Card } from "react-bulma-components";
import { NavigationComponent } from "./components/Navigation";
import { Profile } from "./components/Profile";
import { Skills } from "./components/Skills";
import { Qualifications } from "./components/Qualifications";

const App: FC = () => {
  return (
    <>
      <NavigationComponent />
      <Section>
        <Profile />
      </Section>
      <Section>
        <Tile kind="ancestor">
          <Tile size={6} vertical>
            <Tile kind="parent" vertical>
              <Tile kind="child" className="card">
                <Card.Header.Title>
                  Skills
                </Card.Header.Title>
                <Card.Content>
                  <Skills />
                </Card.Content>
              </Tile>
            </Tile>
          </Tile>
          <Tile size={6} vertical>
            <Tile kind="parent" vertical>
              <Tile kind="child" className="card">
                <Card.Header.Title>
                  Qualifications
                </Card.Header.Title>
                <Card.Content>
                  <Qualifications />
                </Card.Content>
              </Tile>
            </Tile>
          </Tile>
        </Tile>
      </Section>
    </>
  );
};

export default App;
