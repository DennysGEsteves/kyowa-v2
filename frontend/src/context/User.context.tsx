"use client";

import { Role } from "@/types/roles";
import type { User } from "@/types/user";
import { createContext, useContext, type ReactNode } from "react";

const UserContext = createContext<User | null>({
  name: "Dennys",
  email: "dennys@teste",
  role: Role.ADMIN,
  token: "123",
});

export const UserProvider = ({
  children,
  user,
}: {
  children: ReactNode;
  user: User | null;
}) => {
  const userData = {
    name: "Dennys",
    email: "dennys@teste",
    role: Role.ADMIN,
    token: "123",
  };

  return (
    <UserContext.Provider value={userData}>{children}</UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
