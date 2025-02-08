// import { useUserContext } from "@/context/UserContext";
import { useUserContext } from "@/context/User.context";
import { useCallback, useMemo } from "react";
import AuthRepository from "./Auth/Auth.repository";
import UsersRepository from "./Users/Users.repository";

export interface IRepositoryRequirements {
  baseUrl: string;
  headers?: Record<string, string>;
}

export function useRepository() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL as string;
  const user = useUserContext();

  const headers = useMemo(
    () => ({
      Authorization: "Bearer " + user?.token,
      "Content-Type": "application/json",
    }),
    [user],
  );

  return {
    authRepository: useCallback(() => AuthRepository({ baseUrl }), [baseUrl])(),
    usersRepository: useCallback(
      () => UsersRepository({ baseUrl, headers }),
      [baseUrl, headers],
    )(),
  };
}
