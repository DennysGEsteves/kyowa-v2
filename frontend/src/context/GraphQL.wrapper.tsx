"use client";

import { client } from "@/config/graphql.config";
import { ApolloProvider } from "@apollo/client";

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
