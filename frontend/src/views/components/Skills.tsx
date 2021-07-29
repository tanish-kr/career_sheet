import React, { FC } from "react";
import { Card, Element, Progress } from "react-bulma-components";

export const Skills: FC = () => {
  return (
    <Card>
      <Card.Header.Title>
        Skills
      </Card.Header.Title>
      <Card.Content>
        <dl>
          {/* TODO:  skill取得しloopさせる
              経験年数n年以上をパーセンテージに変換しておく
              maxを何年以上にするか決める
          */}
          <dt>
            <strong>Ruby</strong>
          </dt>
          <Element alignItems="center" renderAs="dd">
            <Progress size="small" color="success" value={100} max={100} />
          </Element>
          <dt>
            <strong>JavaScript</strong>
          </dt>
          <Element alignItems="center" renderAs="dd">
            <Progress size="small" color="success" value={80} max={100} />
          </Element>
        </dl>
      </Card.Content>
    </Card>
  );
}

export default Skills;
