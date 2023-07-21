import {useState} from "react";
import { emailValidator, passwordValidator } from "../../common/Validator.js";

const touchErrors = (errors) => {
  return Object.entries(errors).reduce((acc, [field, fieldError]) => {
    acc[field] = {
      ...fieldError,
      dirty: true,
    };
    return acc;
  }, {});
};

export const LoginFormValidator = form => {
  const [errors, setError] = useState({
    email: {
      dirty: false,
      error: false,
      msg: "",
    },
    password: {
      dirty: false,
      error: false,
      msg: "",
    },
  });

  const validateForm = ({ form, feild, errors, forceTouchErrors=false }) => {
    let isValid = true;

    let nextErrors = JSON.parse(JSON.stringify(errors));

    if (forceTouchErrors) {
      nextErrors = touchErrors(errors);
    }

    const { email, password } = form;

    if (nextErrors.email.dirty && (feild ? feild === "email" : true)) {
      const emailMsg = emailValidator(email, form);
      nextErrors.email.error = !!emailMsg;
      nextErrors.email.msg = emailMsg;
      if (!!emailMsg) isValid = false;
    }

    if (nextErrors.password.dirty && (feild ? feild === "password" : true)) {
      const passwordMsg = passwordValidator(password, form);
      nextErrors.password.error = !!passwordMsg;
      nextErrors.password.msg = passwordMsg;
      if (!!passwordMsg) isValid = false;
    }

    setError(nextErrors);
    return { isValid, errors: nextErrors };
  };

  const onBlurField = (e) => {
    const feild = e.target.name;
    const fieldError = errors[feild];

    if (fieldError.dirty) return;

    const updateError = {
      ...errors,
      [feild]: {
        ...errors[feild],
        dirty: true,
      },
    };

    validateForm({ form, feild, errors: updateError });
  };

  return {
    validateForm,
    onBlurField,
    errors,
  };
};
