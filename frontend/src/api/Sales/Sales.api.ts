import type { Sale } from "@entities";
import type { PaginatedResult } from "@types/pagination";
import { Fetch } from "@utils";
import type { CreateSaleDTO, ListSalesParams, UpdateSaleDTO } from "./Sales.dto";

export const SalesApi = () => {
  const path = `/sales`;

  async function getPaginated(
    params: ListSalesParams,
  ): Promise<PaginatedResult<Sale>> {
    const response = await Fetch.get<PaginatedResult<Sale>>({
      url: path,
      config: { params },
    });

    return response.data;
  }

  async function getById(id: string): Promise<Sale> {
    const response = await Fetch.get<Sale>({
      url: `${path}/${id}`,
    });

    return response.data;
  }

  async function create(data: CreateSaleDTO): Promise<Sale> {
    const response = await Fetch.post<Sale>({
      url: path,
      data,
    });

    return response.data;
  }

  async function update(id: string, data: UpdateSaleDTO): Promise<Sale> {
    const response = await Fetch.patch<Sale>({
      url: `${path}/${id}`,
      data,
    });

    return response.data;
  }

  return {
    getPaginated,
    getById,
    create,
    update,
  };
};
