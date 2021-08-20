import { TFunction } from "react-i18next";
import { FormField } from "../Types/Types";

export const checkFormValid = (formFields: FormField[], formState: any) => {
  let formValid = true;

  formFields.forEach(({ required, name, regexp, showIfValue }) => {
    const fieldValue = formState[name];

    if (required) {
      if (!fieldValue) {
        // field is empty
        formValid = false;
      } else if (regexp && !regexp.test(fieldValue)) {
        // doesn't follow the pattern
        formValid = false;
      }
    }

    if (fieldValue && showIfValue?.length) {
      // field has a value and fields to show
      if (!checkFormValid(showIfValue, formState)) formValid = false;
    }
  });
  return formValid;
};

export const validateField = (
  formValue: string,
  valid: boolean,
  errMessage: string | null,
  setValid: React.Dispatch<React.SetStateAction<boolean>>,
  setErrMessage: React.Dispatch<React.SetStateAction<string | null>>,
  t: TFunction<"translation">,
  options?: {
    validateEmptyField?: boolean;
    validateRegExp?: boolean;
    regexp?: RegExp;
  }
) => {
  if (options?.validateEmptyField && !formValue) {
    // no value
    setValid(false);
    setErrMessage(t("form.validator.emptyField"));
  } else if (
    options?.validateRegExp &&
    options?.regexp &&
    !options?.regexp.test(formValue)
  ) {
    // doesn't match with RegExp pattern
    setValid(false);
    setErrMessage(t("form.validator.wrongPattern"));
  } else if (!valid) {
    // valid
    setValid(true);
    if (errMessage) setErrMessage(null);
  }
};
