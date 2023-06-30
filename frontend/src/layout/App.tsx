import React, { FC } from "react";
import "./App.css";
import "../scss/App.scss";
import "../locales/config";
import "bulma/css/bulma.min.css";
import { Section, Tile, Card } from "react-bulma-components";
import { NavigationComponent } from "../feature/navigation";
import { Links } from "../feature/link";
import { Profile } from "../feature/profile";
import { Skills } from "../feature/skill";
import { Qualifications } from "../feature/qualification";
import { Company } from "../feature/company";

const App: FC = () => {
  return (
    <>
      <NavigationComponent />
      <Section>
        <Profile />
        <Tile kind="ancestor">
          <Tile size={6} vertical>
            <Tile kind="parent" vertical>
              <Tile kind="child" className="card">
                <Skills />
              </Tile>
            </Tile>
          </Tile>
          <Tile size={6} vertical>
            <Tile kind="parent" vertical>
              <Tile kind="child" className="card">
                <Qualifications />
              </Tile>
              <Tile kind="child" className="card">
                <Card.Header.Title className="has-background-grey-lighter">
                  Links
                </Card.Header.Title>
                <Card.Content className="pt-0">
                  <Links />
                </Card.Content>
              </Tile>
            </Tile>
          </Tile>
        </Tile>
      </Section>
      <Section>
        <Company />
      </Section>
    </>
  );
};

export default App;
