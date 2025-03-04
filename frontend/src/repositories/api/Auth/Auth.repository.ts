import type { IApolloClient } from "@/repositories/repositories.hook";
import { gql } from "@apollo/client";
import type { SigninDTO } from "./Auth.dto";

export function AuthRepository(client: IApolloClient) {
  async function signin(dto: SigninDTO) {
    return client.mutate({
      variables: {
        input: dto,
      },
      mutation: gql`
        mutation Signin($input: SigninDTO!) {
          signin(input: $input) {
            access_token
          }
        }
      `,
    });
  }

  return {
    signin,
  };
}
