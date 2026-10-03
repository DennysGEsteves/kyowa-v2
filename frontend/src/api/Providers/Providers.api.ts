import { Provider } from "@entities";
import type { PaginatedResult } from "@/types/pagination";
import { Fetch } from "@utils";
import type { ListProvidersParams, UpsertProviderDTO } from "./Providers.dto";

export const ProvidersApi = () => {
  const path = `/providers`;

  async function getAll(): Promise<Provider[]> {
    const response = await Fetch.get<Provider[]>({
      url: path,
    });

    return response.data;
  }

  async function getPaginated(
    params: ListProvidersParams,
  ): Promise<PaginatedResult<Provider>> {
    const response = await Fetch.get<PaginatedResult<Provider>>({
      url: `${path}/paginated`,
      config: { params },
    });

    return response.data;
  }

  async function create(data: UpsertProviderDTO): Promise<Provider> {
    const response = await Fetch.post<Provider>({
      url: path,
      data,
    });

    return response.data;
  }

  async function update(
    id: string,
    data: UpsertProviderDTO,
  ): Promise<Provider> {
    const response = await Fetch.patch<Provider>({
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
