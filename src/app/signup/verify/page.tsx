import React, { Suspense } from "react";
import VerifyEmail from "~/components/VerifyEmail";

const Verify: React.FC = () => {
  return (
    <Suspense fallback={<span className="loader"></span>}>
      <VerifyEmail />
    </Suspense>
  );
};

export default Verify;
