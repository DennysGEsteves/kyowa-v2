import type { Store } from "@/@types";
import { gql } from "@apollo/client";
import type { IApolloClient } from "../../repositories.hook";
import type { UpsertStoreDTO } from "./Stores.dto";

export function StoresRepository(client: IApolloClient) {
  async function getAll(): Promise<Store[]> {
    const { data } = await client.query({
      query: gql`
        query GetStores {
          getStores {
            mid
            id
            name
            email
            address
            phone
            obs
            managerId
            manager {
              mid
              name
            }
          }
        }
      `,
    });

    return data.getStores;
  }

  async function getById(id: number): Promise<Store> {
    const { data } = await client.query({
      variables: {
        id,
      },
      query: gql`
        query GetStoreById($id: Float!) {
          getStoreById(id: $id) {
            mid
            id
            name
            email
            address
            phone
            obs
            managerId
          }
        }
      `,
    });

    return data.getStoreById;
  }

  async function update(dto: UpsertStoreDTO): Promise<void> {
    await client.mutate({
      variables: {
        input: dto,
      },
      mutation: gql`
        mutation UpdateStore($input: UpsertStoreDTO!) {
          updateStore(input: $input) {
            mid
            name
            email
            address
            phone
            obs
            managerId
          }
        }
      `,
    });
  }

  async function create(dto: UpsertStoreDTO): Promise<void> {
    await client.mutate({
      variables: {
        input: dto,
      },
      mutation: gql`
        mutation CreateStore($input: UpsertStoreDTO!) {
          createStore(input: $input) {
            name
            email
            address
            phone
            obs
            managerId
          }
        }
      `,
    });
  }

  return {
    getAll,
    getById,
    update,
    create,
  };
}
