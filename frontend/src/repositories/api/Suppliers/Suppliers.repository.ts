import type { Supplier } from "@/types";
import { gql } from "@apollo/client";
import type { IApolloClient } from "../../repositories.hook";
import type { UpsertSupplierDTO } from "./Suppliers.dto";

export function SuppliersRepository(Supplier: IApolloClient) {
  async function getAll(): Promise<Supplier[]> {
    const { data } = await Supplier.query({
      query: gql`
        query GetSuppliers {
          getSuppliers {
            mid
            id
            name
            cnpj
            im
            ie
            email
            address
            phone
            obs
            active
          }
        }
      `,
    });

    return data.getSuppliers;
  }

  async function getAllByPagination(page: number, search?: string) {
    const { data } = await Supplier.query({
      variables: {
        page,
        search,
      },
      query: gql`
        query GetSuppliersByPagination($page: Int, $search: String) {
          getSuppliersByPagination(page: $page, search: $search) {
            items {
              mid
              id
              name
              cnpj
              im
              ie
              email
              address
              phone
              obs
              active
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

    return data.getSuppliersByPagination;
  }

  async function update(dto: UpsertSupplierDTO): Promise<void> {
    await Supplier.mutate({
      variables: {
        input: dto,
      },
      mutation: gql`
        mutation UpdateSupplier($input: UpsertSupplierDTO!) {
          updateSupplier(input: $input) {
            mid
            name
            cnpj
            im
            ie
            email
            address
            phone
            obs
            active
          }
        }
      `,
    });
  }

  async function create(dto: UpsertSupplierDTO): Promise<void> {
    await Supplier.mutate({
      variables: {
        input: dto,
      },
      mutation: gql`
        mutation CreateSupplier($input: UpsertSupplierDTO!) {
          createSupplier(input: $input) {
            mid
            name
            cnpj
            im
            ie
            email
            address
            phone
            obs
            active
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
