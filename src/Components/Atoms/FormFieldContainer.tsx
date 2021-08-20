import React from "react";

import "./FormFieldContainer.scss";

interface Props {}

const FormFieldContainer: React.FC<Props> = ({ children }) => {
  return <div className="form-field-container">{children}</div>;
};

export default FormFieldContainer;
