import React, { type FC } from "react";
import {
  Card,
  Columns,
  Heading,
  Block,
  Tag,
  Form,
  Button
} from "react-bulma-components";
import { useDispatch, useSelector } from "react-redux";
import { ProjectForm } from "./ProjectForm";
import { setOpenModal } from "../../redux/modules/modals";
import { selectProjects } from "../../redux/modules/projects";
import { format } from "date-fns";

interface ProjectProps {
  companyId: string
};

export const Project: FC<ProjectProps> = ({ companyId }) => {
  const projects = useSelector(selectProjects(companyId));
  const dispatch = useDispatch();
  const openModal = (name: string) => {
    dispatch(setOpenModal(name));
  };


  console.log(companyId, projects);
  console.log(companyId, projects[0]);
  return (
    <>
      {projects.length == 0 &&
        <Button onClick={() => {openModal("project")}}>Add project</Button>
      }

      {projects.map((project, index) => (
        <Card key={index}>
          <Card.Header.Title>
            {project.title}
          </Card.Header.Title>
          <Card.Content>
            <div className="fixed-grid has-4-cols">
              <div className="grid">
                <div className="cell">
                  <Heading renderAs="h6" size={6}>
                    期間
                  </Heading>
                  <Block>{format(project.startOn, "yyyy-MM")} - {format(project.endOn, "yyyy-MM")}</Block>
                </div>
                <div className="cell">
                  <Heading renderAs="h6" size={6}>
                    プロジェクトの概要
                  </Heading>
                  <Block>
                    {project.summary}
                  </Block>
                </div>
                <div className="cell">
                  <Heading renderAs="h6" size={6}>
                    メンバー
                  </Heading>
                  <Block>{project.member}人</Block>
                </div>
                <div className="cell">
                  <Heading renderAs="h6" size={6}>
                    担当
                  </Heading>
                  <Block>{project.jobRole}</Block>
                </div>
                <div className="cell is-col-span-2">
                  <Heading renderAs="h6" size={6}>
                    業務内容
                  </Heading>
                  <Block>
                    {project.description}
                  </Block>
                </div>
                <div className="cell is-col-span-2">
                  <Heading renderAs="h6" size={6}>
                    使用技術
                  </Heading>
                  <Form.Field kind="group" multiline={true}>
                    {project.technologies?.map((technology, index) => (
                      <Form.Control key={index}>
                        <Tag.Group hasAddons={technology.version ? true : false}>
                          <Tag color="info">{technology.name}</Tag>
                          {technology.version &&
                            <Tag>{technology.version}</Tag>
                          }
                        </Tag.Group>
                      </Form.Control>
                    ))}
                  </Form.Field>
                </div>
              </div>
            </div>
          </Card.Content>
        </Card>
      ))}

      <ProjectForm companyId={companyId} />
    </>
  );
};

export default Project;
