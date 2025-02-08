"use client";

import { useSidebarContext } from "@/context/Sidebar.context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { FC, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";
import { SidebarView } from "./Sidebar";

const queryClient = new QueryClient();

const SidebarContainer: FC<PropsWithChildren> = function ({ children }) {
  const { isCollapsed } = useSidebarContext();

  return (
    <div className="mt-16 flex items-start">
      <SidebarView />
      <div
        id="main-content"
        className={twMerge(
          "relative h-full w-full overflow-y-auto bg-gray-100 p-5",
          isCollapsed ? "lg:ml-[4.5rem]" : "lg:ml-64",
        )}
      >
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </div>
    </div>
  );
};

export default SidebarContainer;
