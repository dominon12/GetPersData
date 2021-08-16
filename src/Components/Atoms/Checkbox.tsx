import React from "react";

import "./Checkbox.scss";

interface Props {
  checked: boolean;
  handleChange: (value: boolean) => void;
  label: string;
}

const Checkbox: React.FC<Props> = ({ checked, handleChange, label }) => {
  return (
    <div className="checkbox-element" onClick={() => handleChange(!checked)}>
      <input
        className="checkbox-element__checkbox"
        type="checkbox"
        checked={checked}
        onChange={(e) => handleChange(e.target.checked)}
      />
      <label className="checkbox-elements__label">{label}</label>
    </div>
  );
};

export default Checkbox;
