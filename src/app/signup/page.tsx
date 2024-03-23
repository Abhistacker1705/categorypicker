import React, { Suspense } from "react";
import SignUpForm from "~/components/SignUpForm";

const SignUp: React.FC = () => {
  return (
    <Suspense fallback={<span className="loader"></span>}>
      <SignUpForm />
    </Suspense>
  );
};

export default SignUp;
