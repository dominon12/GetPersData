import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import "./Input.scss";

interface Props {
  value: string;
  handleChange: (value: string, key: string) => void;
  placeholder: string;
  label: string;
  type: string;
  required: boolean;
  stateKey: string;
  regexp?: RegExp;
}

const Input: React.FC<Props> = ({
  value,
  handleChange,
  placeholder,
  label,
  type,
  required,
  stateKey,
  regexp,
}) => {
  const { t } = useTranslation();

  const [touched, setTouched] = useState(false);
  const [valid, setValid] = useState(true);
  const [errMessage, setErrMessage] = useState(null);

  const validate = (formValue: string) => {
    if (!formValue) {
      // no value
      setValid(false);
      setErrMessage(t("form.validator.emptyField"));
    } else if (regexp && !regexp.test(formValue)) {
      // doesn't match with RegExp pattern
      setValid(false);
      setErrMessage(t("form.validator.wrongPattern"));
    } else if (!valid) {
      // valid
      if (!valid) setValid(true);
      if (errMessage) setErrMessage(null);
    }
  };

  const handleInputValueChangesFlow = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!touched) setTouched(true);
    handleChange(e.target.value, stateKey);
    if (touched) validate(e.target.value);
  };

  return (
    <div className="input-element">
      <label className={`input-element__label ${required && "required"}`}>
        {label}
      </label>
      <input
        className={`input-element__input ${!valid && "invalid"}`}
        value={value}
        type={type}
        onChange={handleInputValueChangesFlow}
        placeholder={placeholder}
      />
      {touched && !valid && errMessage && (
        <span className="input-element__error">{errMessage}</span>
      )}
    </div>
  );
};

export default Input;
