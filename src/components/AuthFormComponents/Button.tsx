"use client";
import React from "react";
import { NavigationParams } from "~/utils/navigation";

const Button: React.FC<{ isLoading?: boolean }> = ({ isLoading }) => {
  const { windowLocation } = NavigationParams();

  const gettext = (): "CREATE ACCOUNT" | "LOG IN" | "VERIFY" | "LOADING..." => {
    if (!windowLocation) {
      return "LOADING...";
    }
    if (windowLocation[2] == "verify") {
      return "VERIFY";
    } else if (windowLocation[1] == "signup") {
      return "CREATE ACCOUNT";
    } else if (windowLocation[1] == "signin") {
      return "LOG IN";
    }
    return "LOG IN";
  };

  return (
    <button
      className="mt-8 w-[434px] bg-black px-36 py-4 text-white"
      type="submit"
    >
      {!isLoading ? gettext() : <span className="loader"></span>}
    </button>
  );
};

export default Button;
