import { useRouter } from "next/navigation";
import type React from "react";
import useAuth from "~/hooks/useAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
}: ProtectedRouteProps) => {
  const router = useRouter();

  const { user, verified } = useAuth();

  if (!user && verified) {
    router.push("/signin");
    return null;
  }

  return children;
};

export default ProtectedRoute;
