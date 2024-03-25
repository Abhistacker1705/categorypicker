"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
}: ProtectedRouteProps) => {
  const router = useRouter();
  const pathname: string = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const email = window.localStorage.getItem("user");
      const strverified = window.localStorage.getItem("verified");
      const protectedRoutes = ["/dashboard"];
      if ((!email || !strverified) && protectedRoutes.includes(pathname)) {
        toast.warning("Please sign in to view the page");
        router.push("/signin");
      } else if (email && strverified) {
        if (!protectedRoutes.includes(pathname)) router.push("/dashboard");
      }
    }
  }, [pathname, router]);

  return children;
};

export default ProtectedRoute;
