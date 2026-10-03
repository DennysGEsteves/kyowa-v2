import type { Architect } from "@entities";
import { Fetch } from "@utils";
import type { UpsertArchitectDTO } from "./Architects.dto";

export const ArchitectsApi = () => {
  const path = `/architects`;

  async function getAll(): Promise<Architect[]> {
    const response = await Fetch.get<Architect[]>({
      url: path,
    });

    return response.data;
  }

  async function create(data: UpsertArchitectDTO): Promise<Architect> {
    const response = await Fetch.post<Architect>({
      url: path,
      data,
    });

    return response.data;
  }

  async function update(
    id: string,
    data: UpsertArchitectDTO,
  ): Promise<Architect> {
    const response = await Fetch.patch<Architect>({
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
