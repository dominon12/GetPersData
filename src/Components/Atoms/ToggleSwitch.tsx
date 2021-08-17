import React from "react";

import "./ToggleSwitch.scss";

interface Props {
  checked: boolean;
  handleChange: (value: boolean) => void;
  label: string;
}

const ToggleSwitch: React.FC<Props> = ({ checked, handleChange, label }) => {
  return (
    <div className="switch-element" onClick={() => handleChange(!checked)}>
      <input
        className="switch-element__switch"
        type="checkbox"
        checked={checked}
        onChange={(e) => handleChange(e.target.checked)}
      />
      <label className="switch-elements__label">{label}</label>
    </div>
  );
};

export default ToggleSwitch;
