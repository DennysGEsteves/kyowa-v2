import { Provider } from "@entities";
import { Fetch } from "@utils";
import type { UpsertProviderDTO } from "./Providers.dto";

export const ProvidersApi = () => {
  const path = `/providers`;

  async function getAll(): Promise<Provider[]> {
    const response = await Fetch.get<Provider[]>({
      url: path,
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
    create,
    update,
    remove,
  };
};
