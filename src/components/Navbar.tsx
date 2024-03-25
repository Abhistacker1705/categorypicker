"use client";
import React from "react";
import Link from "next/link";
import type { MenuProps, LoggedInUserFnProps } from "../interfaces/NavbarProps";
import { CiSearch } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import useAuth from "~/hooks/useAuth";
import { useRouter } from "next/navigation";

const Navbar: React.FC = () => {
  const { verified } = useAuth();

  const menu: string[] = [
    "Categories",
    "Sale",
    "Clearance",
    "New Stock",
    "Trending",
  ];

  const loggedInUserFns: LoggedInUserFnProps[] = [
    { name: "Help", link: "/help" },
    { name: "Orders & Returns", link: "/orders" },
  ];
  return (
    <nav className="flex w-full items-end justify-between px-10 pb-6 pt-3">
      <Link href="/" className="text-3xl font-bold">
        ECOMMERCE
      </Link>
      <Menu menu={menu} />
      {verified && (
        <LoggedInFunctions loggedInUserFunctions={loggedInUserFns} />
      )}
    </nav>
  );
};

export default Navbar;

const Menu: React.FC<MenuProps> = ({ menu }) => (
  <ul className="flex gap-4">
    <Link
      href={"/dashboard"}
      className="cursor-pointer font-semibold hover:underline"
    >
      Dashboard
    </Link>
    {menu.map((item) => (
      <li key={item} className="cursor-pointer font-semibold hover:underline">
        {item}
      </li>
    ))}
  </ul>
);

const LoggedInFunctions: React.FC<{
  loggedInUserFunctions: LoggedInUserFnProps[];
}> = ({ loggedInUserFunctions }) => {
  const router = useRouter();
  return (
    <div className="flex flex-col justify-between gap-4">
      <ul className="flex gap-2">
        {loggedInUserFunctions.map((func, index) => (
          <li key={index} className="cursor-pointer text-xs hover:underline">
            {func.name}
          </li>
        ))}
        <li
          onClick={() => {
            window.localStorage.removeItem("id");
            window.localStorage.removeItem("user");
            window.localStorage.removeItem("verified");
            router.replace("/signin");
          }}
          aria-label="Logout"
          className="cursor-pointer text-xs hover:underline"
        >
          Logout
        </li>
      </ul>
      <div className="flex justify-end gap-2">
        <CiSearch size={32} />
        <CiShoppingCart size={32} />
      </div>
    </div>
  );
};
