"use client";
import React, { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { toast } from "sonner";
import SignInFormFields from "./AuthFormComponents/SignInFormFields";
import Button from "./AuthFormComponents/Button";
import Header from "./AuthFormComponents/Header";
import Link from "next/link";

const SignInForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Signed In successfully");
    setFormData({ email: "", password: "" });
    console.log(formData);
  };
  return (
    <form onSubmit={handleSubmit} className="form-border-pad-layout">
      <Header />
      <SignInFormFields signinFormData={formData} handleChange={handleChange} />
      <Button />
      <div className="bg-breaker h-[1px] w-full" />
      <p className="flex gap-3 self-center">
        <span>{"Don't have an Account?"}</span>
        <Link className="font-medium hover:underline" href="/signup">
          SIGN UP
        </Link>
      </p>
    </form>
  );
};

export default SignInForm;
