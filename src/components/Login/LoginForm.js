import React, { useState } from "react";
import { LoginFormValidator } from "./LoginFormValidator";
import { useNavigate, Link } from "react-router-dom";

export default function LoginForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const onUpdateField = (e) => {
    const field = e.target.name;
    const nextFormState = {
      ...form,
      [field]: e.target.value,
    };

    setForm(nextFormState);
    if (errors[field].dirty)
      validateForm({
        form: nextFormState,
        errors,
        field,
      });
  };

  const { errors, validateForm, onBlurField } = LoginFormValidator(form);

  const onSubmit = (e) => {
    e.preventDefault();
    const { isValid } = validateForm({ form, errors, forceTouchErrors: true });
    if (!isValid) return;
    alert("API is getting called.");
    navigate("/home", { state: { id: form.email } });
  };
  return (
    <div className="container-fluid">
      <h1 className="text-center">Distribution App</h1>
      <div className="text-center">
        <form onSubmit={onSubmit} className="login">
          <div className="col-xs-sm-md-lg">
            <label className="form-lable">Username</label>
            <input
              type="text"
              className="form-control"
              name="email"
              value={form.email}
              onChange={onUpdateField}
              onBlur={onBlurField}
            />
            {errors.email.dirty && errors.email.error ? (
              <p className="error">{errors.email.msg}</p>
            ) : null}
          </div>
          <div className="col-xs-sm-md-lg my-3">
            <label className="form-lable">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={form.password}
              onChange={onUpdateField}
              onBlur={onBlurField}
            />
            {errors.password.dirty && errors.password.error ? (
              <p className="error">{errors.password.msg}</p>
            ) : null}
          </div>
          <div className="text-center">
            <button className="btn btn-primary" type="submit">
              Login
            </button>
          </div>
          <div className="text-center my-3">
            <Link to="/signUp" className="p-3">
              Sign up?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
