import React, { FC } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Table, Card, Icon } from "react-bulma-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { setOpenModal } from "../../redux/modules/modals";
import { selectQualifications } from "../../redux/modules/qualifications";
import { QualificationForm } from "./QualificationForm";

export const Qualifications: FC = () => {
  const qualifications = useSelector(selectQualifications);
  const qualificationItems = qualifications.map((qualification, index) => (
    <tr key={index}>
      <td>{qualification.name}</td>
      <td>{qualification.acquisitionDate}</td>
    </tr>
  ));
  const dispatch = useDispatch();
  const openModal = (name: string) => {
    dispatch(setOpenModal(name));
  };

  return (
    <>
      <Card.Header>
        <Card.Header.Title className="has-background-grey-lighter">
          Qualifications
        </Card.Header.Title>
        <Card.Header.Icon className="has-background-grey-lighter">
          <Icon
            onClick={() => {
              openModal("qualification");
            }}
          >
            <FontAwesomeIcon icon={faEdit} />
          </Icon>
        </Card.Header.Icon>
      </Card.Header>
      <Card.Content className="pt-0">
        <Table bordered={false} size="fullwidth" striped={true}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Acquisition date</th>
            </tr>
          </thead>
          <tbody>{qualificationItems}</tbody>
        </Table>
      </Card.Content>
      <QualificationForm />
    </>
  );
};

export default Qualifications;
