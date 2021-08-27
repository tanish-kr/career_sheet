import React, { FC } from "react";
import { Card, Level, Content, Columns, Section, Heading } from "react-bulma-components";

export const Company: FC = () => {
  return (
    <Card>
      <Card.Header.Title>Company Name</Card.Header.Title>
      <Card.Content>
        <Columns>
          <Columns.Column size={3}>
            <Content>
              <dl>
                <dt>
                  雇用形態
                </dt>
                <dd>
                  正社員
                </dd>
                <dt>
                  継続年数
                </dt>
                <dd>
                  2001-10-10 - 2005-12-20
                </dd>
                <dt>
                  職種
                </dt>
                <dd>
                  システムエンジニア
                </dd>
              </dl>
            </Content>
          </Columns.Column>
          <Columns.Column>
            その会社でやったことここに記載
          </Columns.Column>
        </Columns>
      </Card.Content>
    </Card>
  );
};

export default Company;
