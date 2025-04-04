import type { User } from "@/@types/user";
import { gql } from "@apollo/client";
import type { IApolloClient } from "../../repositories.hook";
import type { UpsertUserDTO } from "./Users.dto";

export function UsersRepository(client: IApolloClient) {
  async function getAll(): Promise<User[]> {
    const { data } = await client.query({
      query: gql`
        query GetUsers {
          getUsers {
            mid
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

  async function getAllManagers(): Promise<User[]> {
    const { data } = await client.query({
      query: gql`
        query GetUsers {
          getUsersManager {
            mid
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

    return data.getUsersManager;
  }

  async function getById(id: number): Promise<User> {
    const { data } = await client.query({
      variables: {
        id,
      },
      query: gql`
        query GetUserById($id: Float!) {
          getUserById(id: $id) {
            mid
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

    return data.getUserById;
  }

  async function update(dto: UpsertUserDTO): Promise<void> {
    await client.mutate({
      variables: {
        input: dto,
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
        input: dto,
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

  async function inactive(userId: string): Promise<void> {
    await client.mutate({
      variables: {
        userId,
      },
      mutation: gql`
        mutation InactiveUser($userId: ID!) {
          inactiveUser(userId: $userId)
        }
      `,
    });
  }

  async function active(userId: string): Promise<void> {
    await client.mutate({
      variables: {
        userId,
      },
      mutation: gql`
        mutation ActiveUser($userId: ID!) {
          activeUser(userId: $userId)
        }
      `,
    });
  }

  return {
    getAll,
    getAllManagers,
    getById,
    update,
    create,
    inactive,
    active,
  };
}
