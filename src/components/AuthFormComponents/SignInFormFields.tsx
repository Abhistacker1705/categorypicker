import React from "react";
import type { SignInFormProps } from "~/interfaces/SignInFormProps";

const SignInFormFields: React.FC<SignInFormProps> = ({
  signinFormData,
  handleChange,
}) => {
  const { email, password } = signinFormData;

  return (
    <>
      <div className="flexy-col-gap-2">
        <label htmlFor="email">Email</label>
        <input
          className="input-border-rad-pad-2"
          name="email"
          id="email"
          required
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={handleChange}
        />
      </div>
      <div className="flexy-col-gap-2">
        <label htmlFor="pass">Password</label>
        <input
          className="input-border-rad-pad-2"
          name="password"
          id="pass"
          required
          type="password"
          placeholder="Enter Password"
          autoComplete="on"
          value={password}
          onChange={handleChange}
        />
      </div>
    </>
  );
};

export default SignInFormFields;
