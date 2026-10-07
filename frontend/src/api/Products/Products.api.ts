import type { PaginatedResult } from "@types/pagination";
import type { Product } from "@entities";
import { Fetch } from "@utils";
import type {
  CreateProductDTO,
  ListProductsParams,
  ApplyProductPriceAdjustmentParams,
  ApplyProductPriceAdjustmentResult,
  ListUpdatePricesProductsParams,
  ProductNameSuggestion,
  ProductPriceUpdateListItem,
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

  async function searchByName(
    name: string,
    limit = 10,
  ): Promise<ProductNameSuggestion[]> {
    const response = await Fetch.get<ProductNameSuggestion[]>({
      url: `${path}/search-by-name`,
      config: { params: { name, limit } },
    });

    return response.data;
  }

  async function getPaginatedForPriceUpdate(
    params: ListUpdatePricesProductsParams,
  ): Promise<PaginatedResult<ProductPriceUpdateListItem>> {
    const response = await Fetch.get<PaginatedResult<ProductPriceUpdateListItem>>({
      url: `${path}/update-prices/products`,
      config: { params },
    });

    return response.data;
  }

  async function applyPriceAdjustment(
    data: ApplyProductPriceAdjustmentParams,
  ): Promise<ApplyProductPriceAdjustmentResult> {
    const response = await Fetch.put<ApplyProductPriceAdjustmentResult>({
      url: `${path}/update-prices/apply`,
      data,
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
    searchByName,
    getPaginatedForPriceUpdate,
    applyPriceAdjustment,
    create,
    update,
    remove,
  };
};
