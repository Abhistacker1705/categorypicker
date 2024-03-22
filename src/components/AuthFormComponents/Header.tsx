import React from "react";
import { usePathname, useSearchParams } from "next/navigation";
const Header = () => {
  const windowLocation = usePathname()?.split("/")[1];
  const searchParams = useSearchParams();

  if (
    windowLocation == "signup" &&
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

  if (windowLocation == "signup")
    return (
      <>
        <h2 className="text-3.25xl self-center font-semibold">
          Create your Account
        </h2>
      </>
    );

  if (windowLocation == "signin")
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
};

export default Header;
