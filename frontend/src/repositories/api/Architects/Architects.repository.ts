import type { Architect } from "@/types";
import { gql } from "@apollo/client";
import type { IApolloClient } from "../../repositories.hook";
import type { UpsertArchitectDTO } from "./Architects.dto";

export function ArchitectsRepository(client: IApolloClient) {
  async function getAll(): Promise<Architect[]> {
    const { data } = await client.query({
      query: gql`
        query GetArchitects {
          getArchitects {
            mid
            id
            name
            cpf
            birthday
            email
            address
            phone
            obs
            active
            sellerId
            seller {
              mid
              name
            }
          }
        }
      `,
    });

    return data.getArchitects;
  }

  async function getAllByPagination(page: number, search?: string) {
    const { data } = await client.query({
      variables: {
        page,
        search,
      },
      query: gql`
        query GetArchitectsByPagination($page: Int, $search: String) {
          getArchitectsByPagination(page: $page, search: $search) {
            items {
              mid
              id
              name
              cpf
              birthday
              email
              address
              phone
              obs
              active
              sellerId
              seller {
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

    return data.getArchitectsByPagination;
  }

  async function getByName(name: string) {
    const { data } = await client.query({
      variables: {
        name,
      },
      query: gql`
        query GetArchitectsByName($name: String!) {
          getArchitectsByName(name: $name) {
            mid
            name
          }
        }
      `,
    });

    return data.getArchitectsByName;
  }

  async function update(dto: UpsertArchitectDTO): Promise<void> {
    await client.mutate({
      variables: {
        input: dto,
      },
      mutation: gql`
        mutation UpdateArchitect($input: UpsertArchitectDTO!) {
          updateArchitect(input: $input) {
            mid
            id
            name
            cpf
            birthday
            email
            address
            phone
            obs
            active
            sellerId
          }
        }
      `,
    });
  }

  async function create(dto: UpsertArchitectDTO): Promise<void> {
    await client.mutate({
      variables: {
        input: dto,
      },
      mutation: gql`
        mutation CreateArchitect($input: UpsertArchitectDTO!) {
          createArchitect(input: $input) {
            name
            cpf
            birthday
            email
            address
            phone
            obs
            active
            sellerId
          }
        }
      `,
    });
  }

  return {
    getAll,
    getAllByPagination,
    getByName,
    update,
    create,
  };
}
