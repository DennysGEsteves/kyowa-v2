import { Fetch } from "@utils";
import type { LoginDTO } from "./Auth.dto";

export const AuthApi = () => {
  const path = "/auth";

  async function login(credentials: LoginDTO): Promise<string> {
    const response = await Fetch.post<string>({
      url: `${path}/login`,
      data: credentials,
    });

    return response.data;
  }

  return { login };
};
