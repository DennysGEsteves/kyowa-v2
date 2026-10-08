import type { SealDetail, SealSearchItem } from "@entities";
import { Fetch } from "@utils";

export const SealsApi = () => {
  const path = `/seals`;

  async function searchByNumber(number: number): Promise<SealSearchItem[]> {
    const response = await Fetch.get<SealSearchItem[]>({
      url: `${path}/search`,
      config: { params: { number } },
    });

    return response.data;
  }

  async function getById(id: string): Promise<SealDetail> {
    const response = await Fetch.get<SealDetail>({
      url: `${path}/${id}`,
    });

    return response.data;
  }

  async function update(
    id: string,
    data: {
      number: number;
      storeId: string;
      productId: string;
    },
  ): Promise<SealDetail> {
    const response = await Fetch.patch<SealDetail>({
      url: `${path}/${id}`,
      data,
    });

    return response.data;
  }

  return {
    searchByNumber,
    getById,
    update,
  };
};
