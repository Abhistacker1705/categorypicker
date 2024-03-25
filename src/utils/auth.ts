import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
}: ProtectedRouteProps) => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const email = window.localStorage.getItem("user");
      const strverified = window.localStorage.getItem("verified");

      if (!email || !strverified) {
        router.push("/signin");
      }
    }
  }, []);

  return children;
};

export default ProtectedRoute;
