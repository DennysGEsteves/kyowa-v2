import { Fetch } from "@utils";
import type { AuthenticatedUserDTO, LoginDTO } from "./Auth.dto";

export const AuthApi = () => {
  const path = "/auth";

  async function login(credentials: LoginDTO): Promise<AuthenticatedUserDTO> {
    const response = await Fetch.post<AuthenticatedUserDTO>({
      url: `${path}/login`,
      data: credentials,
    });

    return response.data;
  }

  return { login };
};
