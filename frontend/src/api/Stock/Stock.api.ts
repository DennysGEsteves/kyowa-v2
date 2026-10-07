import type { PaginatedResult } from "@types/pagination";
import type { Stock, StockDetail } from "@entities";
import { Fetch } from "@utils";
import type { CreateStockDTO, ListStockParams } from "./Stock.dto";

export const StockApi = () => {
  const path = `/stock`;

  async function getPaginated(
    params: ListStockParams,
  ): Promise<PaginatedResult<Stock>> {
    const response = await Fetch.get<PaginatedResult<Stock>>({
      url: path,
      config: { params },
    });

    return response.data;
  }

  async function getById(id: string): Promise<StockDetail> {
    const response = await Fetch.get<StockDetail>({
      url: `${path}/${id}`,
    });

    return response.data;
  }

  async function create(data: CreateStockDTO): Promise<Stock> {
    const response = await Fetch.post<Stock>({
      url: path,
      data,
    });

    return response.data;
  }

  return {
    getPaginated,
    getById,
    create,
  };
};
