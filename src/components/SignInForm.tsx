"use client";
import React, { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { toast } from "sonner";
import SignInFormFields from "./AuthFormComponents/SignInFormFields";
import Button from "./AuthFormComponents/Button";
import Header from "./AuthFormComponents/Header";
import Link from "next/link";
import { trpc } from "~/app/_trpc/client";
import { useRouter } from "next/navigation";

const SignInForm: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { mutate: signIn, isLoading } = trpc.signin.useMutation();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn(formData, {
      onSuccess: (data) => {
        toast.success(`Signed In successfully`);
        window.localStorage.setItem("user", JSON.stringify(data.email));
        window.localStorage.setItem("verified", JSON.stringify(true));
        setFormData({ email: "", password: "" });
        router.push("/dashboard");
        setTimeout(() => {
          toast.dismiss();
          toast.success(`Welcome back ${data.name}`);
        }, 2000);
      },
      onError: (error) => {
        toast.error(`Error signing in - ${error.message}`);
      },
    });
  };
  return (
    <form onSubmit={handleSubmit} className="form-border-pad-layout">
      <Header />
      <SignInFormFields signinFormData={formData} handleChange={handleChange} />
      <Button isLoading={isLoading} />
      <div className="h-[1px] w-full bg-breaker" />
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
