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
        <div className="fixed-grid has-2-cols">
          <div className="grid">
            <div className="cell is-col-span-2">
              <Profile />
            </div>
            <div className="cell is-row-span-2">
              <Skills />
            </div>
            <div className="cell">
              <Qualifications />
            </div>
            <div className="cell">
              <Card>
                <Card.Header.Title className="has-background-grey-lighter">
                  Links
                </Card.Header.Title>
                <Card.Content className="pt-0">
                  <Links />
                </Card.Content>
              </Card>
            </div>
            <div className="cell is-col-span-2">
              <Company />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
};

export default App;
