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
import { trpc } from "~/app/_trpc/client";

const SignUpForm: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const { email, password, name } = formData;

  const { mutate: signUp, isLoading } = trpc.signup.useMutation();
  const signinformData: SignInFormFieldsTypes = {
    email: email,
    password: password,
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    signUp(formData, {
      onSuccess: (data) => {
        toast.success(`Account created successfully`);
        window.localStorage.setItem("id", JSON.stringify(data.id));
        window.localStorage.setItem("user", JSON.stringify(data.email));
        window.localStorage.setItem("verified", JSON.stringify(data.verified));
        window.sessionStorage.setItem("userotp", JSON.stringify(data.otp));
        setFormData({ name: "", email: "", password: "" });
        router.push("/signup/verify");
        setTimeout(() => {
          toast.dismiss();
          toast.info(
            `Your OTP is ${data.otp}.Click and hold OTP then Click CTRL+C to Copy it,then paste it`,
            {
              duration: Infinity,
              closeButton: true,
            },
          );
        }, 2000);
      },
      onError: (error) => {
        toast.error(`Error creating account - ${error.message}`);
      },
    });
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
      <Button isLoading={isLoading} />
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
