import React, { ReactElement } from "react";
import { FaTelegram, FaGithub, FaLinkedinIn } from "react-icons/fa";

import "./SocialLinks.scss";

interface SocialNetworkLink {
  id: number;
  link: string;
  icon: ReactElement;
}

const SocialLinks: React.FC = () => {
  const socialNetworks: SocialNetworkLink[] = [
    {
      id: 1,
      link: "https://github.com/dominon12/GetPersData",
      icon: <FaGithub />,
    },
    {
      id: 2,
      link: "https://t.me/ScouttBot",
      icon: <FaTelegram />,
    },
    {
      id: 3,
      link: "https://linkedin.com/in/maksim-sobolev-351029215/",
      icon: <FaLinkedinIn />,
    },
  ];

  const renderSocialNetworks = () =>
    socialNetworks.map(({ id, link, icon }) => (
      <a
        key={id}
        className="social-networks__link"
        href={link}
        target="_blank"
        rel="noreferrer"
      >
        {icon}
      </a>
    ));

  return <div className="social-networks">{renderSocialNetworks()}</div>;
};

export default SocialLinks;
