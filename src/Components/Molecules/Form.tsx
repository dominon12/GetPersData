import React, { useEffect, useState } from "react";

import "./Form.scss";
import Input from "./Input";
import ToggleSwitch from "../Atoms/ToggleSwitch";
import { FormField } from "../../Types/Types";
import Select from "./Select";

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

  const initializeFormFieldsWithDefaultValues = (fields: FormField[]) =>
    fields.forEach((field) =>
      handleChangeFormState(field.defaultValue, field.name)
    );

  useEffect(() => {
    initializeFormFieldsWithDefaultValues(fields);
  }, []);

  const renderFormFields = (fields: FormField[]): any =>
    fields.map((field, index) => {
      let valueToReturn;

      switch (field.type) {
        case 1: // Input
          valueToReturn = (
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
          break;
        case 2: // ToggleSwitch
          valueToReturn = (
            <ToggleSwitch
              key={field.id}
              checked={formState[field.name]}
              stateKey={field.name}
              handleChange={handleChangeFormState}
              label={field.label}
            />
          );
          break;
        case 3: // Select
          valueToReturn = (
            <Select
              key={field.id}
              label={field.label}
              value={formState[field.name]}
              stateKey={field.name}
              handleChange={handleChangeFormState}
              defaultValue={field.defaultValue}
              values={field.selectValues ?? []}
              required={field.required}
            />
          );
          break;
        default:
          valueToReturn = `Undefined field type at index #${index}`;
          break;
      }

      return (
        <>
          {valueToReturn}
          {formState[field.name] &&
            field.showIfValue?.length &&
            renderFormFields(field.showIfValue)}
        </>
      );
    });

  return (
    <form className={`form ${className}`}>{renderFormFields(fields)}</form>
  );
};

export default Form;
