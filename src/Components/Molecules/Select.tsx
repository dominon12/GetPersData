import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import FormError from "../Atoms/FormError";
import { SelectValue } from "../../Types/Types";
import { validateField } from "../../Services/FormService";
import FormLabel from "../Atoms/FormLabel";
import FormFieldContainer from "../Atoms/FormFieldContainer";

interface Props {
  label: string;
  value: string | number;
  values: SelectValue[];
  stateKey: string;
  handleChange: (value: string, key: string) => void;
  defaultValue?: string | number;
  required?: boolean;
}

const Select: React.FC<Props> = ({
  label,
  value,
  values,
  required,
  handleChange,
  stateKey,
}) => {
  const { t } = useTranslation();

  const [touched, setTouched] = useState(false);
  const [valid, setValid] = useState(true);
  const [errMessage, setErrMessage] = useState<string | null>(null);

  const handleSelectValueChangesFlow = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    let instantTouched = touched; // use a variable because React updates state asynchronously
    if (!touched) {
      setTouched(true);
      instantTouched = true;
    }
    handleChange(e.target.value, stateKey);
    instantTouched &&
      validateField(
        e.target.value,
        valid,
        errMessage,
        setValid,
        setErrMessage,
        t,
        { validateEmptyField: true }
      );
  };

  return (
    <FormFieldContainer>
      {label && <FormLabel required={required}>{label}</FormLabel>}

      <select
        value={value}
        onChange={handleSelectValueChangesFlow}
        className={`form-field ${touched ? (valid ? "valid" : "invalid") : "untouched"}`}
        required={required}
      >
        <option value="">{t("form.fields.select.choose")}</option>
        {values.map((value) => (
          <option key={value.id} value={value.value}>
            {value.displayValue}
          </option>
        ))}
      </select>

      {touched && !valid && errMessage && <FormError>{errMessage}</FormError>}
    </FormFieldContainer>
  );
};

export default Select;
