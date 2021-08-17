import { FormField } from "../Types/Types";

export const checkFormValid = (formFields: FormField[], formState: any) => {
  let formValid = true;

  formFields.forEach(({ required, name, regexp }) => {
    if (required) {
      const fieldValue = formState[name];
      if (!fieldValue) {
        formValid = false;
      } else if (regexp && !regexp.test(fieldValue)) {
        formValid = false;
      }
    }
  });
  return formValid;
};
