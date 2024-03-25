import { useState, useLayoutEffect } from "react";

const useAuth = () => {
  const [user, setUser] = useState<string | null | undefined>("");
  const [userotp, setUserotp] = useState<string | null | undefined>("");
  const [verified, setVerified] = useState<boolean>(false);
  const [userid, setUserId] = useState<number>();
  useLayoutEffect(() => {
    const email = window.localStorage.getItem("user");
    const strverified = window.localStorage.getItem("verified");
    const otp = window.sessionStorage.getItem("userotp");
    const userid = window.localStorage.getItem("id");

    setUserId(Number(userid));
    setUser(email?.substring(1, email?.length - 1));
    setUserotp(otp?.substring(1, otp?.length - 1));
    if (strverified && strverified.length > 0) setVerified(true);
  }, []);

  return { user, userotp, verified, userid };
};

export default useAuth;
