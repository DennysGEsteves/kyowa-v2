import { Fetch } from "@utils";
import { User } from "@entities";
import { UpsertUserDTO } from "./Users.dto";

export const UsersApi = () => {
  const path = `/users`;

  async function getAll(): Promise<User[]> {
    const response = await Fetch.get<User[]>({
      url: `${path}`,
    });

    return response.data;
  }

  async function create(user: UpsertUserDTO): Promise<User> {
    const response = await Fetch.post<User>({
      url: `${path}`,
      data: user,
    });

    return response.data;
  }

  async function update(id: string, user: UpsertUserDTO): Promise<User> {
    const response = await Fetch.patch<User>({
      url: `${path}/${id}`,
      data: user,
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
