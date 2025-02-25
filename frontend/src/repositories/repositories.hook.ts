/* eslint-disable react-hooks/exhaustive-deps */
// import { useUserContext } from "@/context/UserContext";
import { useAuthContext } from "@/context/Auth.context";
import type { NormalizedCacheObject } from "@apollo/client";
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useCallback } from "react";
import UsersRepository from "./Users/users.repository";

export type IApolloClient = ApolloClient<NormalizedCacheObject>;

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export function useRepository() {
  const token = useAuthContext();

  const client = useCallback(() => {
    const authLink = setContext(async (_, { headers }) => {
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : "",
        },
      };
    });

    return new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    });
  }, [token]);

  return {
    usersRepository: useCallback(() => UsersRepository(client()), [token])(),
  };
}
