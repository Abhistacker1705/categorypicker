"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/signup");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="flex h-[60vh] w-screen items-center justify-center">
        <h2 className="text-3xl font-bold">Welcome to Category Picker</h2>
      </div>
    </>
  );
}
