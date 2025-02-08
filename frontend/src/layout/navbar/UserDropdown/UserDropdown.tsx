"use client";

import { useUserContext } from "@/context/User.context";
import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
} from "flowbite-react";
import type { ReactNode } from "react";

const UserDropdown = ({ logout }: { logout: ReactNode }) => {
  const user = useUserContext();

  return (
    <Dropdown
      arrowIcon={false}
      inline
      label={
        <span>
          <span className="sr-only">User menu</span>
          <Avatar
            alt=""
            img="../images/users/neil-sims.png"
            rounded
            size="sm"
          />
        </span>
      }
    >
      <DropdownHeader>
        <span className="block text-sm">{user.name}</span>
        <span className="block truncate text-sm font-medium">{user.email}</span>
      </DropdownHeader>
      <DropdownItem>Meus dados</DropdownItem>
      <DropdownDivider />
      {logout}
    </Dropdown>
  );
};

export default UserDropdown;
