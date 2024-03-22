import React from "react";
import Link from "next/link";
import type { MenuProps, LoggedInUserFnProps } from "../interfaces/NavbarProps";
import { CiSearch } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";

const Navbar: React.FC = () => {
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
      <LoggedInFunctions loggedInUserFunctions={loggedInUserFns} />
    </nav>
  );
};

export default Navbar;

const Menu: React.FC<MenuProps> = ({ menu }) => (
  <ul className="flex gap-4">
    {menu.map((item) => (
      <li key={item} className="cursor-pointer font-semibold hover:underline">
        {item}
      </li>
    ))}
  </ul>
);

const LoggedInFunctions: React.FC<{
  loggedInUserFunctions: LoggedInUserFnProps[];
}> = ({ loggedInUserFunctions }) => (
  <div className="flex flex-col justify-between gap-4">
    <ul className="flex gap-2">
      {loggedInUserFunctions.map((func, index) => (
        <li key={index}>
          <Link className="text-xs hover:underline" href={func.link}>
            {func.name}
          </Link>
        </li>
      ))}
      <li>
        <Link className="text-xs hover:underline" href="/profile">
          Hi John
        </Link>
      </li>
    </ul>
    <div className="flex justify-end gap-2">
      <CiSearch size={32} />
      <CiShoppingCart size={32} />
    </div>
  </div>
);
