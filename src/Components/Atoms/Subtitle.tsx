import React from "react";

import "./Subtitle.scss";

interface Props {
  className: string;
}

const Subtitle: React.FC<Props> = ({ children, className }) => {
  return <h2 className={`subtitle ${className}`}>{children}</h2>;
};

export default Subtitle;
