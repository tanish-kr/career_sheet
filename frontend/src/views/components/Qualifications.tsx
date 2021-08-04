import React, { FC } from "react";
import { Table } from "react-bulma-components";

export const Qualifications: FC = () => {
  return (
    <Table bordered={false} size="fullwidth" striped={true}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Acquisition date</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>基本情報技術者試験</td>
          <td>2002/08</td>
        </tr>
        <tr>
          <td>初級システムアドミニストレータ</td>
          <td>2001/08</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default Qualifications;
