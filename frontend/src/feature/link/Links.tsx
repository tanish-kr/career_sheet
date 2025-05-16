import React, { type FC } from "react";
import { Content, Icon } from "react-bulma-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

export const Links: FC = () => {
  return (
    <Content>
      <ul className="mt-0">
        <li>
          <a href="#" target="_blank">
            Blog
            <Icon>
              <FontAwesomeIcon icon={faExternalLinkAlt} />
            </Icon>
          </a>
        </li>
        <li>
          <a href="#" target="_blank">
            Github
            <Icon>
              <FontAwesomeIcon icon={faExternalLinkAlt} />
            </Icon>
          </a>
        </li>
        <li>
          <a href="#" target="_blank">
            LinkedIn
            <Icon>
              <FontAwesomeIcon icon={faExternalLinkAlt} />
            </Icon>
          </a>
        </li>
      </ul>
    </Content>
  );
};

export default Links;
