"use client";
import React from "react";
import SignUpForm from "~/components/SignUpForm";
import { useSearchParams } from "next/navigation";
import VerifyEmail from "~/components/VerifyEmail";

const SignUp: React.FC = () => {
  const searchParams = useSearchParams();

  if (searchParams.keys().next().value == "verify") {
    return <VerifyEmail />;
  }

  return <SignUpForm />;
};

export default SignUp;
