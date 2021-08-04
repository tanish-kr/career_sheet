import React, { FC } from "react";
import {
  Level,
  Heading,
  Image,
  Columns,
  Card,
  Element,
} from "react-bulma-components";

export const Profile: FC = () => {
  return (
    <Columns>
      <Columns.Column>
        <Card>
          <Card.Header.Icon className="avatar-header">
            <Image
              className="avatar"
              src="https://www.pikpng.com/pngl/m/16-168770_user-iconset-no-profile-picture-icon-circle-clipart.png"
              size={96}
              rounded={true}
            />
          </Card.Header.Icon>
          <Card.Content>
            <Level>
              <Level.Side align="left">
                <Heading size={4} renderAs="p">
                  Name
                </Heading>
              </Level.Side>
              <Level.Side align="right">
                <Heading size={6} renderAs="p">
                  Man(Age)
                </Heading>
              </Level.Side>
            </Level>
            <Element textSize="5" textAlign="left">
              About
            </Element>
          </Card.Content>
        </Card>
      </Columns.Column>
    </Columns>
  );
};

export default Profile;
