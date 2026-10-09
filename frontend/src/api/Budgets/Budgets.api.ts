import type { Budget } from "@entities";
import type { PaginatedResult } from "@types/pagination";
import { Fetch } from "@utils";
import type {
  CreateBudgetDTO,
  ListBudgetsParams,
  UpdateBudgetDTO,
} from "./Budgets.dto";

export const BudgetsApi = () => {
  const path = `/budgets`;

  async function getPaginated(
    params: ListBudgetsParams,
  ): Promise<PaginatedResult<Budget>> {
    const response = await Fetch.get<PaginatedResult<Budget>>({
      url: path,
      config: { params },
    });

    return response.data;
  }

  async function getById(id: string): Promise<Budget> {
    const response = await Fetch.get<Budget>({
      url: `${path}/${id}`,
    });

    return response.data;
  }

  async function create(data: CreateBudgetDTO): Promise<Budget> {
    const response = await Fetch.post<Budget>({
      url: path,
      data,
    });

    return response.data;
  }

  async function update(id: string, data: UpdateBudgetDTO): Promise<Budget> {
    const response = await Fetch.patch<Budget>({
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
