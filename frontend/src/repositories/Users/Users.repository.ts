import Fetch from "@/services/Fetch/Fetch.service";
import type { User } from "@/types/user";
import type { IRepositoryRequirements } from "../repositories.hook";

export function UsersRepository({ baseUrl, headers }: IRepositoryRequirements) {
  const basePath = `${baseUrl}/users`;

  function getUsers(): Promise<User[]> {
    return Fetch.get({
      url: basePath,
      headers: {
        ...headers,
      },
      cacheTag: "register-users",
    });
  }

  function upsertUser(data: { name: string; email: string }): Promise<User> {
    return Fetch.post({
      url: basePath,
      data,
      headers: {
        ...headers,
      },
    });
  }

  return {
    getUsers,
    upsertUser,
  };
}

export default UsersRepository;
