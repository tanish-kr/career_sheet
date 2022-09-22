import React, { FC } from "react";
import { useSelector } from "react-redux";
import { Table } from "react-bulma-components";
import { selectQualifications } from "../../redux/modules/qualifications";

export const Qualifications: FC = () => {
  const qualifications = useSelector(selectQualifications);
  const qualificationItems = qualifications.map((qualification, index) => (
    <tr key={index}>
      <td>{qualification.name}</td>
      <td>{qualification.acquisitionDate}</td>
    </tr>
  ));

  return (
    <Table bordered={false} size="fullwidth" striped={true}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Acquisition date</th>
        </tr>
      </thead>
      <tbody>{qualificationItems}</tbody>
    </Table>
  );
};

export default Qualifications;
