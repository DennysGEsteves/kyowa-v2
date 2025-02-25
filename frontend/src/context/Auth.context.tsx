"use client";

import { redirect } from "next/navigation";
import { createContext, useContext, type ReactNode } from "react";

const AuthContext = createContext<string | undefined>(undefined);

export const AuthProvider = ({
  children,
  token,
}: {
  children: ReactNode;
  token?: string;
}) => {
  return <AuthContext.Provider value={token}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const token = useContext(AuthContext);
  if (!token) {
    return redirect("/login");
  }
  return token;
};
