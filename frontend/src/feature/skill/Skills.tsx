import React, { type FC } from "react";
import { useSelector } from "react-redux";
import { Element, Progress, Card, Icon } from "react-bulma-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { selectSkills } from "../../redux/modules/skills";
import { setOpenModal } from "../../redux/modules/modals";
import { SkillForm } from "./SkillForm";

export const Skills: FC = () => {
  const skills = useSelector(selectSkills);
  const dispatch = useDispatch();
  const openModal = (name: string) => {
    dispatch(setOpenModal(name));
  };

  const listItems = skills.map((skill, index) => (
    <span key={index}>
      <dt>
        <strong>{skill.name}</strong>
      </dt>
      <Element alignItems="center" renderAs="dd">
        <Progress
          size="small"
          color="success"
          value={skill.experience}
          max={100}
        />
      </Element>
    </span>
  ));

  return (
    <>
      <Card.Header>
        <Card.Header.Title className="has-background-grey-lighter">
          Skills
        </Card.Header.Title>
        <Card.Header.Icon className="has-background-grey-lighter">
          <Icon
            onClick={() => {
              openModal("skill");
            }}
          >
            <FontAwesomeIcon icon={faEdit} />
          </Icon>
        </Card.Header.Icon>
      </Card.Header>

      <Card.Content className="pt-0">
        <dl>{listItems}</dl>
      </Card.Content>

      <SkillForm />
    </>
  );
};

export default Skills;
