import React from "react";

import "./FormError.scss";

const FormError: React.FC = ({ children }) => {
  return <span className="form-error">{children}</span>;
};

export default FormError;
