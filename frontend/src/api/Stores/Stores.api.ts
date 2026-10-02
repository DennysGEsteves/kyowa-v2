import type { Store } from "@entities";
import { Fetch } from "@utils";
import type { UpsertStoreDTO } from "./Stores.dto";

export const StoresApi = () => {
  const path = `/stores`;

  async function getAll(): Promise<Store[]> {
    const response = await Fetch.get<Store[]>({
      url: path,
    });

    return response.data;
  }

  async function create(data: UpsertStoreDTO): Promise<Store> {
    const response = await Fetch.post<Store>({
      url: path,
      data,
    });

    return response.data;
  }

  async function update(id: string, data: UpsertStoreDTO): Promise<Store> {
    const response = await Fetch.patch<Store>({
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
