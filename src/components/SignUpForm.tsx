"use client";
import Link from "next/link";
import React, { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { toast } from "sonner";
import SignInFormFields from "./AuthFormComponents/SignInFormFields";
import type { SignInFormFieldsTypes } from "~/interfaces/SignInFormProps";
import Button from "./AuthFormComponents/Button";
import Header from "./AuthFormComponents/Header";
import { useRouter } from "next/navigation";

const SignUpForm: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;
  const signinformData: SignInFormFieldsTypes = {
    email: email,
    password: password,
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Account created successfully");
    setFormData({ name: "", email: "", password: "" });
    router.push("?verify");
    console.log(formData);
  };

  return (
    <form className="form-border-pad-layout" onSubmit={handleSubmit}>
      <Header />
      <div className="flexy-col-gap-2">
        <label htmlFor="name">Name</label>
        <input
          className="input-border-rad-pad-2"
          name="name"
          id="name"
          type="text"
          required
          placeholder="Enter Name"
          value={name}
          onChange={handleChange}
        />
      </div>
      <SignInFormFields
        signinFormData={signinformData}
        handleChange={handleChange}
      />
      <Button />
      <p className="flex gap-3 self-center">
        <span>Have an Account?</span>
        <Link className="font-medium hover:underline" href="/signin">
          LOGIN
        </Link>
      </p>
    </form>
  );
};

export default SignUpForm;
