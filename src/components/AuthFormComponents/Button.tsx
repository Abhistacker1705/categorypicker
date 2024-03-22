import React from "react";
import { usePathname, useSearchParams } from "next/navigation";

const Button: React.FC = () => {
  const windowLocation = usePathname()?.split("/")[1];
  const searchParams = useSearchParams();

  const gettext = (): "CREATE ACCOUNT" | "LOG IN" | "VERIFY" => {
    if (
      windowLocation == "signup" &&
      searchParams.keys().next().value == "verify"
    ) {
      return "VERIFY";
    } else if (windowLocation == "signup") {
      return "CREATE ACCOUNT";
    } else if (windowLocation == "signin") {
      return "LOG IN";
    }
    return "LOG IN";
  };

  return (
    <button
      className="mt-8 w-[434px] bg-black px-36 py-4 text-white"
      type="submit"
    >
      {windowLocation && gettext()}
    </button>
  );
};

export default Button;
