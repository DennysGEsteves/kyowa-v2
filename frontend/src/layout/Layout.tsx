import type { FC, PropsWithChildren } from "react";
import { NavbarContainer } from "./";
import SidebarContainer from "./sidebar/SidebarContainer";

const LayoutContent: FC<PropsWithChildren> = function ({ children }) {
  return (
    <>
      <NavbarContainer />
      <SidebarContainer>{children}</SidebarContainer>
    </>
  );
};

export default LayoutContent;
