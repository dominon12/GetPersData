import React from "react";

import "./ContentWrapper.scss";

const ContentWrapper: React.FC = ({ children }) => {
  return (
    <div className="wrapper">
      <div className="content">{children}</div>
    </div>
  );
};

export default ContentWrapper;
