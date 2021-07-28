import React, { FC } from "react";
import { Card, Element, Progress } from "react-bulma-components";

export const Skills: FC = () => {
  return (
    <Card>
      <Card.Header.Title>
        Skills
      </Card.Header.Title>
      <Card.Content>
        <ul>
          {/* TODO:  skill取得しloopさせる
              経験年数n年以上をパーセンテージに変換しておく
              maxを何年以上にするか決める
          */}
          <li>
            <strong>Ruby</strong>
            <Element alignItems="center">
              <Progress size="small" color="success" value={100} max={100} />
            </Element>
          </li>
          <li>
            <strong>JavaScript</strong>
            <Element alignItems="center">
              <Progress size="small" color="success" value={80} max={100} />
            </Element>
          </li>
        </ul>
      </Card.Content>
    </Card>
  );
}

export default Skills;
