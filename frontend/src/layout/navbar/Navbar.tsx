import { Navbar } from "flowbite-react";
import type { FC } from "react";
import NavbarLogo from "./NavbarLogo";
import NotificationBellDropdown from "./NotificationBellDropdown";
import UserDropdownWrapper from "./UserDropdown/UserDropdownWrapper";

export const NavbarContainer: FC = function () {
  return (
    <header>
      <Navbar
        fluid
        className="fixed top-0 z-30 w-full border-b border-gray-200 bg-white p-0 dark:border-gray-700 dark:bg-gray-800 sm:p-0"
      >
        <div className="w-full p-3 pr-4">
          <div className="flex items-center justify-between">
            <NavbarLogo />
            <div className="flex items-center lg:gap-3">
              <div className="flex items-center">
                <NotificationBellDropdown />
              </div>
              <div className="hidden lg:block">
                <UserDropdownWrapper />
              </div>
            </div>
          </div>
        </div>
      </Navbar>
    </header>
  );
};
