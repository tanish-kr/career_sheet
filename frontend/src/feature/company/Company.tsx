import React, { type FC } from "react";
import { Card, Content, Columns, Icon, Button } from "react-bulma-components";
import { Project } from "../project/Project";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { CompanyForm } from "./CompanyForm";
import { useSelector } from "react-redux";
import { selectCompanies } from "../../redux/modules/companies";
import { setOpenModal } from "../../redux/modules/modals";
import { format } from "date-fns";

export const Company: FC = () => {
  const companies = useSelector(selectCompanies);
  const dispatch = useDispatch();
  const openModal = (name: string) => {
    dispatch(setOpenModal(name));
  };
  console.log(companies);
  return (
    <>
      {companies.length == 0 &&
        <Button onClick={() => {openModal("company")}}>Add company info</Button>
      }

      {companies.map((company, index) => (
        <Card key={index}>
          <Card.Header>
            <Card.Header.Title className="has-background-grey-lighter">
              {company.name}
            </Card.Header.Title>
            <Card.Header.Icon className="has-background-grey-lighter">
              <Icon
                onClick={() => {
                  openModal("company");
                }}
              >
                <FontAwesomeIcon icon={faEdit} />
              </Icon>
            </Card.Header.Icon>
          </Card.Header>
          <Card.Content>
            <Columns>
              <Columns.Column size={3}>
                <Content>
                  <dl>
                    <dt>雇用形態</dt>
                    <dd>{company.employmentForm}</dd>
                    <dt>継続年数</dt>
                    <dd>{format(company.startOn, "yyyy-MM")} - {format(company.endOn, "yyyy-MM")}</dd>
                    <dt>職種</dt>
                    <dd>{company.occupation}</dd>
                  </dl>
                </Content>
              </Columns.Column>
              <Columns.Column>{company.accomplishment}</Columns.Column>
            </Columns>
            <Columns>
              <Project />
            </Columns>
          </Card.Content>
        </Card>
      ))}
      <CompanyForm />
    </>
  );
};

export default Company;
