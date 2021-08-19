import React from "react";

import "./Button.scss";

interface Props {
  buttonStyle: "primary";
  onClick: () => void;
}

const Button: React.FC<Props> = ({ children, buttonStyle, onClick }) => {
  return (
    <button className={`button ${buttonStyle}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
