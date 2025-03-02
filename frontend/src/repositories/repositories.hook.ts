/* eslint-disable react-hooks/exhaustive-deps */
// import { useUserContext } from "@/context/UserContext";
import { useAuthContext } from "@/context/Auth.context";
import type { NormalizedCacheObject } from "@apollo/client";
import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { useCallback } from "react";
import { StoresRepository, UsersRepository } from "./api";

export type IApolloClient = ApolloClient<NormalizedCacheObject>;

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_API_BASE_URL,
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
    // Você pode adicionar lógica adicional aqui, como logout em caso de 401
  }
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
      link: ApolloLink.from([errorLink, authLink, httpLink]),
      cache: new InMemoryCache(),
    });
  }, [token]);

  return {
    usersRepository: useCallback(() => UsersRepository(client()), [token])(),
    storesRepository: useCallback(() => StoresRepository(client()), [token])(),
  };
}

export function useRepositorySSR(token: string) {
  const client = () => {
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
  };

  return {
    usersRepository: UsersRepository(client()),
    storesRepository: StoresRepository(client()),
  };
}
