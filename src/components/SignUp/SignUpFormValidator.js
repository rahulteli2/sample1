import {useState} from 'react';
import {emailValidator,nameValidator,passwordValidator,confirmPasswordValidator} from '../../common/Validator';

const touchErrors = (errors) => {
    return Object.entries(errors).reduce((acc, [field, fieldError]) => {
      acc[field] = {
        ...fieldError,
        dirty: true,
      };
      return acc;
    }, {});
  };

export const SignUpFormValidator = form =>{
    const [errors, setErrors] = useState({
        name: {
            dirty: false,
            error: false,
            msg: "",
        },
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
        cnfPassword: {
            dirty: false,
            error: false,
            msg: "",
        }
    })

    const validateForm = ({form,Feild,errors,forceTouchErrors=false}) =>{
        let isValid = true;

        let nextErrors = JSON.parse(JSON.stringify(errors));

        if (forceTouchErrors) {
            nextErrors = touchErrors(errors);
        }

        const { name, email, password, cnfPassword} = form;

        if(nextErrors.email.dirty && (Feild ? Feild === 'email': true))
        {
            let emailMsg = emailValidator(email);
            nextErrors.email.error = !!emailMsg;
            nextErrors.email.msg = emailMsg;
            if (!!emailMsg) isValid = false;
        }
        if(nextErrors.password.dirty && (Feild ? Feild === 'password': true))
        {
            let passwordMsg = passwordValidator(password);
            nextErrors.password.error = !!passwordMsg;
            nextErrors.password.msg = passwordMsg;
            if (!!passwordMsg) isValid = false;
        }
        if(nextErrors.name.dirty && (Feild ? Feild === 'name': true))
        {
            let nameMsg = nameValidator(name);
            nextErrors.name.error = !!nameMsg;
            nextErrors.name.msg = nameMsg;
            if (!!nameMsg) isValid = false;
        }
        if(nextErrors.cnfPassword.dirty && (Feild ? Feild === 'cnfPassword': true))
        {
            let cnfPasswordMsg = confirmPasswordValidator(cnfPassword,form);
            nextErrors.cnfPassword.error = !!cnfPasswordMsg;
            nextErrors.cnfPassword.msg = cnfPasswordMsg;
            if (!!cnfPasswordMsg) isValid = false;
        }

        setErrors(nextErrors);
        return { isValid, errors: nextErrors };
    }

    const onFocusFeild = (e) =>{
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
    }
    return {
        validateForm,
        onFocusFeild,
        errors,
      };
}