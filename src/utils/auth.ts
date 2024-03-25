import { useRouter } from "next/navigation";
import type React from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
}: ProtectedRouteProps) => {
  const router = useRouter();

  const email = window.localStorage.getItem("user");
  const strverified = window.localStorage.getItem("verified");

  if (!email && !strverified) {
    router.push("/signin");
    return null;
  } else return children;
};

export default ProtectedRoute;
