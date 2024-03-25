import React, { Suspense } from "react";
import SignUpForm from "~/components/SignUpForm";
import ProtectedRoute from "~/utils/auth";

const SignUp: React.FC = () => {
  return (
    <ProtectedRoute>
      <Suspense fallback={<span className="loader"></span>}>
        <SignUpForm />
      </Suspense>
    </ProtectedRoute>
  );
};

export default SignUp;
