import React from "react";

import "./Input.scss";

interface Props {
  value: string;
  handleChange: (value: string) => void;
  placeholder: string;
  label: string;
  type: string;
  required: boolean;
}

const Input: React.FC<Props> = ({
  value,
  handleChange,
  placeholder,
  label,
  type,
  required,
}) => {
  return (
    <div className="input-element">
      <label className={`input-element__label ${required && "required"}`}>
        {label}
      </label>
      <input
        className="input-element__input"
        value={value}
        type={type}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
