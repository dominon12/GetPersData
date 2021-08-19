import React from "react";

import "./Button.scss";

interface Props {
  buttonStyle: "primary";
  onClick: () => void;
  disabled?: boolean;
}

const Button: React.FC<Props> = ({
  children,
  buttonStyle,
  onClick,
  disabled,
}) => {
  return (
    <button
      className={`button ${buttonStyle}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
