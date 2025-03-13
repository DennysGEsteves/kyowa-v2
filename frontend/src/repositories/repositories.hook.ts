/* eslint-disable react-hooks/exhaustive-deps */
// import { useUserContext } from "@/context/UserContext";
import { useAuthContext } from "@/context/Auth.context";
import { useRequesErrorDialog } from "@/context/RequestErrorDialog/RequestErrorDialog.hook";
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
import {
  ArchitectsRepository,
  AuthRepository,
  ClientsRepository,
  StoresRepository,
  SuppliersRepository,
  UsersRepository,
} from "./api";

export type IApolloClient = ApolloClient<NormalizedCacheObject>;

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export function useRepository() {
  const token = useAuthContext();
  const { openDialog } = useRequesErrorDialog();

  const errorLink = onError(({ response }) => {
    if (response) {
      try {
        const message = response.errors?.[0]?.message;
        const errorData = JSON.parse(message as string);

        if (
          errorData &&
          errorData.statusCode === 401 &&
          errorData.error === "UNAUTHORIZED"
        ) {
          window.location.href = "/login";
        } else {
          openDialog(
            "Informe o administrador do sistema sobre este erro abaixo",
            errorData,
          );
        }
      } catch (e) {
        openDialog(
          "Informe o administrador do sistema sobre este erro abaixo",
          {
            message: response.errors?.[0],
          },
        );
      }
    }
  });

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
    architectsRepository: useCallback(
      () => ArchitectsRepository(client()),
      [token],
    )(),
    clientsRepository: useCallback(
      () => ClientsRepository(client()),
      [token],
    )(),
    suppliersRepository: useCallback(
      () => SuppliersRepository(client()),
      [token],
    )(),
  };
}

export function useRepositorySSR(token?: string) {
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
      link: ApolloLink.from([authLink, httpLink]),
      cache: new InMemoryCache(),
      ssrMode: true,
    });
  };

  return {
    authRepository: AuthRepository(client()),
    usersRepository: UsersRepository(client()),
    storesRepository: StoresRepository(client()),
  };
}
