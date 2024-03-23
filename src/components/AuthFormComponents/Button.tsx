"use client";
import React, { Suspense } from "react";
import { NavigationParams } from "~/utils/navigation";

const Button: React.FC = () => {
  const { windowLocation, searchParams } = NavigationParams();

  const gettext = (): "CREATE ACCOUNT" | "LOG IN" | "VERIFY" | "LOADING" => {
    if (searchParams == null || windowLocation.length < 1) {
      return "LOADING";
    }
    if (
      windowLocation[1] == "signup" &&
      searchParams.keys().next().value == "verify"
    ) {
      return "VERIFY";
    } else if (windowLocation[1] == "signup") {
      return "CREATE ACCOUNT";
    } else if (windowLocation[1] == "signin") {
      return "LOG IN";
    }
    return "LOG IN";
  };

  return (
    <Suspense>
      <button
        className="mt-8 w-[434px] bg-black px-36 py-4 text-white"
        type="submit"
      >
        {searchParams !== null && windowLocation[1] !== null ? (
          gettext()
        ) : (
          <span className="loader"></span>
        )}
      </button>
    </Suspense>
  );
};

export default Button;
