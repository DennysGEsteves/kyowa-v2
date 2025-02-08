"use client";

import { useSidebarContext } from "@/context/Sidebar.context";
import { useUserContext } from "@/context/User.context";
import { getRoutesByUserRole } from "@/routes/definitions";
import { Sidebar } from "flowbite-react";
import Link from "next/link";
import { type FC } from "react";
import { twMerge } from "tailwind-merge";

export const SidebarView: FC = function () {
  const { isCollapsed } = useSidebarContext();
  const { role } = useUserContext();
  const routes = getRoutesByUserRole(role);

  return (
    <Sidebar
      collapsed={isCollapsed}
      className={twMerge(
        "fixed inset-y-0 left-0 z-20 mt-16 flex h-full shrink-0 flex-col border-r border-gray-200 duration-75 lg:flex",
        isCollapsed && "hidden w-16",
      )}
    >
      {routes.map((route, i) => (
        <div key={i}>
          {route.session && (
            <>
              <span className="mb-2 ml-3 mt-6 block text-xs font-semibold text-gray-500">
                {route.session}
              </span>

              <nav className="flex-1">
                {route.pages.map((page) => (
                  <Link
                    key={page.pathname}
                    href={page.pathname}
                    className="flex cursor-pointer items-center border-l-amber-600 px-4 py-2 text-sm font-medium text-white outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-amber-600 hover:text-amber-600 focus:border-l-4"
                  >
                    {page.title}
                  </Link>
                ))}
              </nav>
            </>
          )}
          {!route.session && (
            <nav className="flex-1">
              {route.pages.map((page) => (
                <Link
                  key={page.pathname}
                  href={page.pathname}
                  className="flex cursor-pointer items-center border-l-rose-600 px-4 py-2 text-sm font-medium text-gray-600 outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-rose-600 hover:text-rose-600 focus:border-l-4"
                >
                  {page.title}
                </Link>
              ))}
            </nav>
          )}
        </div>
      ))}
    </Sidebar>
  );
};
