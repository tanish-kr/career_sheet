import React, { type FC } from "react";
import {
  Card,
  Columns,
  Heading,
  Block,
  Tag,
  Form,
} from "react-bulma-components";

export const Project: FC = () => {
  return (
    <Card>
      <Card.Header.Title>
        リース関連株式会社□□向けサブシステム開発
      </Card.Header.Title>
      <Card.Content>
        <Columns>
          <Columns.Column size={2}>
            <Heading renderAs="h6" size={6}>
              期間
            </Heading>
            <Block>2012-10 - 2013-08</Block>
          </Columns.Column>
          <Columns.Column size={5}>
            <Heading renderAs="h6" size={6}>
              プロジェクトの概要
            </Heading>
            <Block>
              リース会社2社統合に伴い、契約登録・契約移動等のためのサブシステム開発。
            </Block>
          </Columns.Column>
          <Columns.Column size={2}>
            <Heading renderAs="h6" size={6}>
              メンバー
            </Heading>
            <Block>10人</Block>
          </Columns.Column>
          <Columns.Column size={3}>
            <Heading renderAs="h6" size={6}>
              担当
            </Heading>
            <Block>詳細設計、開発、単体テスト</Block>
          </Columns.Column>
          <Columns.Column size={6}>
            <Heading renderAs="h6" size={6}>
              業務内容
            </Heading>
            <Block>
              ・契約管理処理バッチの開発、テスト
              ・インターフェースの設計、開発、テスト
              ・Shell、UNIXコマンドを使用しての汎用機の評価 ・テスト仕様書の作成
            </Block>
          </Columns.Column>
          <Columns.Column size={6}>
            <Heading renderAs="h6" size={6}>
              使用技術
            </Heading>
            <Form.Field kind="group" multiline={true}>
              <Form.Control>
                <Tag.Group hasAddons={true}>
                  <Tag color="info">Ruby</Tag>
                  <Tag>3.0</Tag>
                </Tag.Group>
              </Form.Control>
              <Form.Control>
                <Tag.Group hasAddons={true}>
                  <Tag color="info">Ruby on Rails</Tag>
                  <Tag>6.0</Tag>
                </Tag.Group>
              </Form.Control>
              <Form.Control>
                <Tag.Group hasAddons={true}>
                  <Tag color="info">React</Tag>
                  <Tag>3.0</Tag>
                </Tag.Group>
              </Form.Control>
              <Form.Control>
                <Tag.Group hasAddons={true}>
                  <Tag color="info">React Redux</Tag>
                  <Tag>3.0</Tag>
                </Tag.Group>
              </Form.Control>
              <Form.Control>
                <Tag.Group hasAddons={true}>
                  <Tag color="info">Docker</Tag>
                  <Tag>3.0</Tag>
                </Tag.Group>
              </Form.Control>
              <Form.Control>
                <Tag.Group hasAddons={true}>
                  <Tag color="info">Amazon Aurora DB</Tag>
                  <Tag>3.0</Tag>
                </Tag.Group>
              </Form.Control>
            </Form.Field>
          </Columns.Column>
        </Columns>
      </Card.Content>
    </Card>
  );
};

export default Project;
