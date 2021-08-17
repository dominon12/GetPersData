import React from "react";

import "./ToggleSwitch.scss";

interface Props {
  checked: boolean;
  handleChange: (value: boolean, key: string) => void;
  label: string;
  stateKey: string;
}

const ToggleSwitch: React.FC<Props> = ({
  checked,
  handleChange,
  label,
  stateKey,
}) => {
  return (
    <div
      className="switch-element"
      onClick={() => handleChange(!checked, stateKey)}
    >
      <input
        className="switch-element__switch"
        type="checkbox"
        checked={checked}
        onChange={(e) => handleChange(e.target.checked, stateKey)}
      />
      <label className="switch-elements__label">{label}</label>
    </div>
  );
};

export default ToggleSwitch;
