import React, { FC, useState } from "react";
import {
  Level,
  Heading,
  Image,
  Columns,
  Card,
  Element,
  Icon,
} from "react-bulma-components";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import {
  ModalState,
  setOpenModal,
  setCloseModal,
} from "../../redux/modules/modals";
import { ProfileForm } from "../containers/ProfileForm";

export const Profile: FC = () => {
  // const modalName = useSelector<ModalState, string>((state) => state.name);
  const dispatch = useDispatch();
  // const [openModal, setOpenModal] = useState<string |null>();
  const openModal = (name: string) => {
    dispatch(setOpenModal(name));
  };

  return (
    <>
      <Columns>
        <Columns.Column>
          <Card>
            <div className="avatar-header is-flex is-justify-content-center">
              <Image
                className=""
                size={96}
                rounded={true}
                src="https://placehold.jp/96x96.png"
              />
            </div>
            <Card.Header>
              <Card.Header.Title></Card.Header.Title>
              <Card.Header.Icon>
                {/* <i onClick={setOpenModal("profile")}> */}
                {/*   <FontAwesomeIcon icon={faEdit} /> */}
                {/* </i> */}
                <Icon
                  onClick={() => {
                    openModal("profile");
                  }}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </Icon>
              </Card.Header.Icon>
            </Card.Header>
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
      <ProfileForm />
    </>
  );
};

export default Profile;
