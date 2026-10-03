import type { PaginatedResult } from "@/types/pagination";
import type { Product } from "@entities";
import { Fetch } from "@utils";
import type {
  CreateProductDTO,
  ListProductsParams,
  UpdateProductDTO,
} from "./Products.dto";

export const ProductsApi = () => {
  const path = `/products`;

  async function getAll(): Promise<Product[]> {
    const response = await Fetch.get<Product[]>({
      url: path,
    });

    return response.data;
  }

  async function getPaginated(
    params: ListProductsParams,
  ): Promise<PaginatedResult<Product>> {
    const response = await Fetch.get<PaginatedResult<Product>>({
      url: `${path}/paginated`,
      config: { params },
    });

    return response.data;
  }

  async function create(data: CreateProductDTO): Promise<Product> {
    const response = await Fetch.post<Product>({
      url: path,
      data,
    });

    return response.data;
  }

  async function update(
    id: string,
    data: UpdateProductDTO,
  ): Promise<Product> {
    const response = await Fetch.patch<Product>({
      url: `${path}/${id}`,
      data,
    });

    return response.data;
  }

  async function remove(id: string): Promise<void> {
    await Fetch.delete({
      url: `${path}/${id}`,
    });
  }

  return {
    getAll,
    getPaginated,
    create,
    update,
    remove,
  };
};
