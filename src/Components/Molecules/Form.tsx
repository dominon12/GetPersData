import React, { useEffect } from "react";

import "./Form.scss";
import Input from "../Atoms/Input";
import ToggleSwitch from "../Atoms/ToggleSwitch";
import { FormField } from "../../Types/Types";

interface Props {
  fields: FormField[];
  setFormState: React.Dispatch<React.SetStateAction<{}>>;
  formState: any;
  className: string;
}

const Form: React.FC<Props> = ({
  fields,
  formState,
  setFormState,
  className,
}) => {
  const handleChangeFormState = (value: any, key: string) => {
    setFormState((prev: any) => {
      let prevStateCopy = { ...prev };
      prevStateCopy[key] = value;
      return prevStateCopy;
    });
  };

  const initializeFormFieldsWithDefaultValues = () => {
    fields.forEach((field) =>
      handleChangeFormState(field.defaultValue, field.name)
    );
  };

  useEffect(() => {
    initializeFormFieldsWithDefaultValues();
  }, []);

  const renderFormFields = () =>
    fields.map((field, index) => {
      switch (field.type) {
        case 1: // Input
          return (
            <Input
              key={field.id}
              stateKey={field.name}
              value={formState[field.name]}
              handleChange={handleChangeFormState}
              label={field.label}
              required={field.required}
              regexp={field.regexp}
              placeholder={field.placeholder ?? field.label}
              type={field.htmlType ?? "text"}
            />
          );
        case 2: // ToggleSwitch
          return (
            <ToggleSwitch
              key={field.id}
              checked={formState[field.name]}
              stateKey={field.name}
              handleChange={handleChangeFormState}
              label={field.label}
            />
          );
        default:
          return `Undefined field type at index #${index}`;
      }
    });

  return <form className={`form ${className}`}>{renderFormFields()}</form>;
};

export default Form;
