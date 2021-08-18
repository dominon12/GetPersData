import React from "react";

import "./Title.scss";

interface Props {
  className?: string;
}

const Title: React.FC<Props> = ({ children, className }) => {
  return <h1 className={`title ${className}`}>{children}</h1>;
};

export default Title;
