import React, { Suspense } from "react";
import SignInForm from "~/components/SignInForm";

const SignIn: React.FC = () => {
  return (
    <Suspense fallback={<span className="loader"></span>}>
      <SignInForm />
    </Suspense>
  );
};

export default SignIn;
