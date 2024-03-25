import React, { Suspense } from "react";
import VerifyEmail from "~/components/VerifyEmail";
import ProtectedRoute from "~/utils/auth";

const Verify: React.FC = () => {
  return (
    <ProtectedRoute>
      <Suspense fallback={<span className="loader"></span>}>
        <VerifyEmail />
      </Suspense>
    </ProtectedRoute>
  );
};

export default Verify;
