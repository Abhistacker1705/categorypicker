"use client";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  router.push("/signup");

  return (
    <div className="flex h-[60vh] w-screen items-center justify-center">
      <h2 className="text-3xl font-bold">Welcome to Category Picker</h2>
    </div>
  );
}
