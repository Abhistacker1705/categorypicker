import React, { Suspense } from "react";
import { NavigationParams } from "~/utils/navigation";
import useAuth from "~/hooks/useAuth";

const HeaderComp = () => {
  const { windowLocation } = NavigationParams();
  const { user } = useAuth();

  if (!windowLocation) <Loading />;
  else {
    if (windowLocation[2] == "verify")
      return (
        <>
          <div className="flexy-col gap-3">
            <h2 className="self-center text-2xl font-medium">
              Verify your email address
            </h2>
            {user && (
              <p className="self-center">
                Enter the 8 digit code you have received on{" "}
                <span className="font-medium">{user}</span>
              </p>
            )}
          </div>
        </>
      );

    if (windowLocation[1] == "signup")
      return (
        <>
          <h2 className="self-center text-3.25xl font-semibold">
            Create your Account
          </h2>
        </>
      );

    if (windowLocation[1] == "signin")
      return (
        <>
          <h2 className="self-center text-3.25xl font-semibold">Login</h2>
          <div className="flexy-col gap-3">
            <h2 className="self-center text-2xl font-medium">
              Welcome back to ECOMMERCE
            </h2>
            <p className="self-center">The Next Gen Business MarketPlace</p>
          </div>
        </>
      );
  }
};

const Header: React.FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <HeaderComp />
    </Suspense>
  );
};

export default Header;

const Loading: React.FC = () => (
  <>
    <div className="flexy-col gap-4">
      <div className="h-12 w-[50%] animate-pulse self-center rounded-lg bg-slate-200 text-2xl font-medium" />
      <div className="h-6 w-full animate-pulse self-center rounded-lg bg-slate-200" />
    </div>
  </>
);
