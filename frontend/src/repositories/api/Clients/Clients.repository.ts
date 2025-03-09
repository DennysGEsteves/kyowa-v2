import type { Client } from "@/types";
import { gql } from "@apollo/client";
import type { IApolloClient } from "../../repositories.hook";
import type { UpsertClientDTO } from "./Clients.dto";

export function ClientsRepository(client: IApolloClient) {
  async function getAll(): Promise<Client[]> {
    const { data } = await client.query({
      query: gql`
        query GetClients {
          getClients {
            mid
            id
            name
            cpf
            rg
            birthday
            occupation
            email
            address
            phone
            obs
            active
            interestProducts
            origins
            createdAt
            architectId
            architect {
              mid
              name
            }
          }
        }
      `,
    });

    return data.getClients;
  }

  async function getAllByPagination(page: number, search?: string) {
    const { data } = await client.query({
      variables: {
        page,
        search,
      },
      query: gql`
        query GetClientsByPagination($page: Int, $search: String) {
          getClientsByPagination(page: $page, search: $search) {
            items {
              mid
              id
              name
              cpf
              rg
              birthday
              occupation
              email
              address
              phone
              obs
              active
              interestProducts
              origins
              createdAt
              architectId
              architect {
                mid
                name
              }
            }
            meta {
              total
              page
              totalPages
            }
          }
        }
      `,
    });

    return data.getClientsByPagination;
  }

  async function update(dto: UpsertClientDTO): Promise<void> {
    await client.mutate({
      variables: {
        input: dto,
      },
      mutation: gql`
        mutation UpdateClient($input: UpsertClientDTO!) {
          updateClient(input: $input) {
            mid
            name
            cpf
            rg
            birthday
            occupation
            email
            address
            phone
            obs
            interestProducts
            origins
            architectId
          }
        }
      `,
    });
  }

  async function create(dto: UpsertClientDTO): Promise<void> {
    await client.mutate({
      variables: {
        input: dto,
      },
      mutation: gql`
        mutation CreateClient($input: UpsertClientDTO!) {
          createClient(input: $input) {
            mid
            name
            cpf
            rg
            birthday
            occupation
            email
            address
            phone
            obs
            interestProducts
            origins
            architectId
          }
        }
      `,
    });
  }

  return {
    getAll,
    getAllByPagination,
    update,
    create,
  };
}
