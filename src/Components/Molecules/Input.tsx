import React, { useState, forwardRef } from "react";
import { useTranslation } from "react-i18next";

import FormError from "../Atoms/FormError";
import FormFieldContainer from "../Atoms/FormFieldContainer";
import FormLabel from "../Atoms/FormLabel";
import { validateField } from "../../Services/FormService";

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
    const [errMessage, setErrMessage] = useState<string | null>(null);

    const handleInputValueChangesFlow = (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      let instantTouched = touched; // use a variable because React updates state asynchronously
      if (!touched) {
        setTouched(true);
        instantTouched = true;
      }
      handleChange && stateKey && handleChange(e.target.value, stateKey);
      instantTouched &&
        validateField(
          e.target.value,
          valid,
          errMessage,
          setValid,
          setErrMessage,
          t,
          { validateEmptyField: true, validateRegExp: true, regexp }
        );
    };

    return (
      <FormFieldContainer>
        {label && <FormLabel required={required}>{label}</FormLabel>}

        <input
          className={`form-field ${
            touched ? (valid ? "valid" : "invalid") : "untouched"
          }`}
          value={value}
          type={type ?? "text"}
          onChange={handleInputValueChangesFlow}
          placeholder={placeholder ?? ""}
          disabled={disabled}
          ref={ref}
        />

        {touched && !valid && errMessage && <FormError>{errMessage}</FormError>}
      </FormFieldContainer>
    );
  }
);

export default Input;
