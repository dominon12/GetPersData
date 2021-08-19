import React, { useState, forwardRef } from "react";
import { useTranslation } from "react-i18next";

import "./Input.scss";

interface Props {
  value: string;
  placeholder?: string;
  label?: string;
  type?: string;
  handleChange?: (value: string, key: string) => void;
  stateKey?: string;
  required?: boolean;
  disabled?: boolean;
  regexp?: RegExp;
}

const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      value,
      handleChange,
      placeholder,
      label,
      type,
      required,
      disabled,
      stateKey,
      regexp,
    },
    ref
  ) => {
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
      handleChange && stateKey && handleChange(e.target.value, stateKey);
      if (touched) validate(e.target.value);
    };

    return (
      <div className="input-element">
        {label && (
          <label className={`input-element__label ${required && "required"}`}>
            {label}
          </label>
        )}
        <input
          className={`input-element__input ${!valid && "invalid"}`}
          value={value}
          type={type ?? "text"}
          onChange={handleInputValueChangesFlow}
          placeholder={placeholder ?? ""}
          disabled={disabled}
          ref={ref}
        />
        {touched && !valid && errMessage && (
          <span className="input-element__error">{errMessage}</span>
        )}
      </div>
    );
  }
);

export default Input;
