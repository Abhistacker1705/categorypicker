"use client";

import { useEffect, useState } from "react";
import type { ReadonlyURLSearchParams } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";

export function NavigationParams() {
  const [windowLocation, setWindowLocation] = useState<string[]>([]);
  const [searchParams, setSearchParams] = useState<ReadonlyURLSearchParams>();
  const pathname = usePathname();
  const search = useSearchParams();

  useEffect(() => {
    setWindowLocation(pathname?.split("/"));
    setSearchParams(search);
  }, [pathname, search]);

  if (searchParams) return { windowLocation, searchParams };
  else {
    return { windowLocation: null, searchParams: null };
  }
}
