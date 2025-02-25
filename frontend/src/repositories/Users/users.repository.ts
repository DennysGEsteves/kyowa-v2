import type { User } from "@/types/user";
import { gql } from "@apollo/client";
import type { IApolloClient } from "../repositories.hook";
import type { UpsertUserDTO } from "./User.dto";

export function UsersRepository(client: IApolloClient) {
  async function getAll(): Promise<User[]> {
    const { data } = await client.query({
      query: gql`
        query GetUsers {
          getUsers {
            id
            name
            email
            phone
            login
            storeId
            role
            active
          }
        }
      `,
    });

    return data.getUsers;
  }

  async function update(dto: UpsertUserDTO): Promise<void> {
    await client.mutate({
      variables: {
        input: {
          id: dto.id,
          name: dto.name,
          email: dto.email,
          phone: dto.phone,
          storeId: dto.storeId,
          role: dto.role,
          login: dto.login,
        },
      },
      mutation: gql`
        mutation UpdateUser($input: UpsertUserDTO!) {
          updateUser(input: $input) {
            name
            email
            phone
            login
            role
            storeId
          }
        }
      `,
    });
  }

  async function create(dto: UpsertUserDTO): Promise<void> {
    await client.mutate({
      variables: {
        input: {
          name: dto.name,
          email: dto.email,
          phone: dto.phone,
          storeId: dto.storeId,
          role: dto.role,
          login: dto.login,
        },
      },
      mutation: gql`
        mutation CreateUser($input: UpsertUserDTO!) {
          createUser(input: $input) {
            name
            email
            phone
            login
            role
            storeId
          }
        }
      `,
    });
  }

  async function inactive(userId: number): Promise<void> {
    await client.mutate({
      variables: {
        userId,
      },
      mutation: gql`
        mutation InactiveUser($userId: Int!) {
          inactiveUser(userId: $userId)
        }
      `,
    });
  }

  async function active(userId: number): Promise<void> {
    await client.mutate({
      variables: {
        userId,
      },
      mutation: gql`
        mutation ActiveUser($userId: Int!) {
          activeUser(userId: $userId)
        }
      `,
    });
  }

  return {
    getAll,
    update,
    create,
    inactive,
    active,
  };
}

export default UsersRepository;
