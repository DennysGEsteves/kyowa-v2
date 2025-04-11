import type { Product } from "@/@types";
import { gql } from "@apollo/client";
import type { IApolloClient } from "../../repositories.hook";
import type { UpsertProductDTO } from "./Products.dto";

export function ProductsRepository(client: IApolloClient) {
  async function getAll(): Promise<Product[]> {
    const { data } = await client.query({
      query: gql`
        query GetProducts {
          getProducts {
            mid
            id
            name
            fantasyName
            ref
            ncm
            cst
            ean
            buyBrice
            sellPrice
            hasSeals
            amountStart
            amountSold
            isAmountUnlimited
            supplierId
            supplier {
              mid
              name
            }
          }
        }
      `,
    });

    return data.getProducts;
  }

  async function getAllByPagination(page: number, search?: string) {
    const { data } = await client.query({
      variables: {
        page,
        search,
      },
      query: gql`
        query GetProductsByPagination($page: Int, $search: String) {
          getProductsByPagination(page: $page, search: $search) {
            items {
              mid
              id
              name
              fantasyName
              ref
              ncm
              cst
              ean
              buyBrice
              sellPrice
              hasSeals
              amountStart
              amountSold
              isAmountUnlimited
              supplierId
              supplier {
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

    return data.getProductsByPagination;
  }

  async function getByName(name: string) {
    const { data } = await client.query({
      variables: {
        name,
      },
      query: gql`
        query GetProductsByName($name: String!) {
          getProductsByName(name: $name) {
            mid
            id
            name
          }
        }
      `,
    });

    return data.getProductsByName;
  }

  async function getById(id: number) {
    const { data } = await client.query({
      variables: {
        id,
      },
      query: gql`
        query GetProductById($id: Float!) {
          getProductById(id: $id) {
            mid
            id
            name
            fantasyName
            ref
            ncm
            cst
            ean
            buyBrice
            sellPrice
            hasSeals
            amountStart
            amountSold
            isAmountUnlimited
            supplierId
          }
        }
      `,
    });

    return data.getProductById;
  }

  async function update(dto: UpsertProductDTO): Promise<void> {
    await client.mutate({
      variables: {
        input: dto,
      },
      mutation: gql`
        mutation UpdateProduct($input: UpsertProductDTO!) {
          updateProduct(input: $input) {
            mid
            id
            name
            fantasyName
            ref
            ncm
            cst
            ean
            buyBrice
            sellPrice
            hasSeals
            amountStart
            amountSold
            isAmountUnlimited
            supplierId
          }
        }
      `,
    });
  }

  async function create(dto: UpsertProductDTO): Promise<void> {
    await client.mutate({
      variables: {
        input: dto,
      },
      mutation: gql`
        mutation CreateProduct($input: UpsertProductDTO!) {
          createProduct(input: $input) {
            name
            fantasyName
            ref
            ncm
            cst
            ean
            buyBrice
            sellPrice
            hasSeals
            amountStart
            amountSold
            isAmountUnlimited
            supplierId
          }
        }
      `,
    });
  }

  return {
    getAll,
    getAllByPagination,
    getByName,
    getById,
    update,
    create,
  };
}
