import React from "react";

import "./FormLabel.scss";

interface Props {
  required?: boolean;
}

const FormLabel: React.FC<Props> = ({ children, required }) => {
  return (
    <label className={`form-label ${required && "required"}`}>{children}</label>
  );
};

export default FormLabel;
