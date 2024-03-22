import type { ChangeEvent } from "react";

export interface SignInFormProps {
  signinFormData: {
    email: string;
    password: string;
  };
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface SignInFormFieldsTypes {
  email: string;
  password: string;
}
