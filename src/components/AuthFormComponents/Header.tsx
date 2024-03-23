import React, { Suspense } from "react";
import { NavigationParams } from "~/utils/navigation";

const HeaderComp = () => {
  const { windowLocation, searchParams } = NavigationParams();

  if (!windowLocation || !searchParams) <Loading />;
  else {
    if (
      windowLocation[1] == "signup" &&
      searchParams.keys().next().value == "verify"
    )
      return (
        <>
          <div className="flexy-col gap-3">
            <h2 className="self-center text-2xl font-medium">
              Verify your email address
            </h2>
            <p className="self-center">
              Enter the 8 digit code you have received on{" "}
              <span className="font-medium">anu***@gmail.com</span>
            </p>
          </div>
        </>
      );

    if (windowLocation[1] == "signup")
      return (
        <>
          <h2 className="text-3.25xl self-center font-semibold">
            Create your Account
          </h2>
        </>
      );

    if (windowLocation[1] == "signin")
      return (
        <>
          <h2 className="text-3.25xl self-center font-semibold">Login</h2>
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
    <Suspense fallback={<span className="loader"></span>}>
      <HeaderComp />
    </Suspense>
  );
};

export default Header;

const Loading = () => (
  <>
    <div className="flexy-col gap-4">
      <div className="h-12 w-[50%] animate-pulse self-center rounded-lg bg-slate-200 text-2xl font-medium" />
      <div className="h-6 w-full animate-pulse self-center rounded-lg bg-slate-200" />
    </div>
  </>
);
