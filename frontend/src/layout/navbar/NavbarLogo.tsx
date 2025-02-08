"use client";

import { useSidebarContext } from "@/context/Sidebar.context";
import { isSmallScreen } from "@/utils";
import { NavbarBrand } from "flowbite-react";
import Image from "next/image";
import type { FC } from "react";
import { HiMenuAlt1, HiX } from "react-icons/hi";

const NavbarLogo: FC = () => {
  const { isCollapsed: isSidebarCollapsed, setCollapsed: setSidebarCollapsed } =
    useSidebarContext();

  return (
    <div className="flex items-center">
      {isSmallScreen() && (
        <button
          aria-controls="sidebar"
          aria-expanded
          className="mr-2 cursor-pointer rounded p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:bg-gray-700 dark:focus:ring-gray-700"
          onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
        >
          {isSidebarCollapsed ? (
            <HiMenuAlt1 className="size-6" />
          ) : (
            <HiX className="size-6" />
          )}
        </button>
      )}
      <NavbarBrand href="/">
        <Image
          className="mr-2 "
          src="/kyowa-avatar.png"
          alt="logo"
          width={24}
          height={24}
        />
        <span className="self-center whitespace-nowrap px-3 text-xl font-semibold dark:text-white">
          Kyowa Admin
        </span>
      </NavbarBrand>
    </div>
  );
};

export default NavbarLogo;
