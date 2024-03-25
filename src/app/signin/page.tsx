import React, { Suspense } from "react";
import SignInForm from "~/components/SignInForm";
import ProtectedRoute from "~/utils/auth";

const SignIn: React.FC = () => {
  return (
    <ProtectedRoute>
      <Suspense fallback={<span className="loader"></span>}>
        <SignInForm />
      </Suspense>
    </ProtectedRoute>
  );
};

export default SignIn;
