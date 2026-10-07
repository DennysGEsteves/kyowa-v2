import type { PaginatedResult } from "@types/pagination";
import type { Client } from "@entities";
import { Fetch } from "@utils";
import type { ListClientsParams, UpsertClientDTO } from "./Clients.dto";

export const ClientsApi = () => {
  const path = `/clients`;

  async function getAll(): Promise<Client[]> {
    const response = await Fetch.get<Client[]>({
      url: path,
    });

    return response.data;
  }

  async function getPaginated(
    params: ListClientsParams,
  ): Promise<PaginatedResult<Client>> {
    const response = await Fetch.get<PaginatedResult<Client>>({
      url: `${path}/paginated`,
      config: { params },
    });

    return response.data;
  }

  async function create(data: UpsertClientDTO): Promise<Client> {
    const response = await Fetch.post<Client>({
      url: path,
      data,
    });

    return response.data;
  }

  async function update(id: string, data: UpsertClientDTO): Promise<Client> {
    const response = await Fetch.patch<Client>({
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
