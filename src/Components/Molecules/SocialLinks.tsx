import React, { ReactElement } from "react";
import { FaTelegram, FaGithub, FaLinkedinIn } from "react-icons/fa";

import "./SocialLinks.scss";

interface SocialNetworkLink {
  link: string;
  icon: ReactElement;
}

const SocialLinks: React.FC = () => {
  const socialNetworks: SocialNetworkLink[] = [
    {
      link: "https://github.com/dominon12/GetPersData",
      icon: <FaGithub />,
    },
    {
      link: "https://t.me/ScouttBot",
      icon: <FaTelegram />,
    },
    {
      link: "https://linkedin.com/in/maksim-sobolev-351029215/",
      icon: <FaLinkedinIn />,
    },
  ];

  const renderSocialNetworks = () =>
    socialNetworks.map(({ link, icon }) => (
      <a
        className="social-networks__link"
        href={link}
        target="_blank"
        rel="nofollow"
      >
        {icon}
      </a>
    ));

  return <div className="social-networks">{renderSocialNetworks()}</div>;
};

export default SocialLinks;
