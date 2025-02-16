// import { useUserContext } from "@/context/UserContext";
import { useCallback } from "react";
import AuthRepository from "./Auth/Auth.repository";

export interface IRepositoryRequirements {
  baseUrl: string;
  headers?: Record<string, string>;
}

export function useRepository() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL as string;

  return {
    authRepository: useCallback(() => AuthRepository({ baseUrl }), [baseUrl])(),
  };
}
