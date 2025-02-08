import Fetch from "@/services/Fetch/Fetch.service";
import type { IRepositoryRequirements } from "../repositories.hook";
import type { SigninDTO } from "./Auth.dto";

export function AuthRepository({ baseUrl }: IRepositoryRequirements) {
  const basePath = `${baseUrl}/users`;

  function signin(data: SigninDTO) {
    return Fetch.post({
      url: basePath,
      data,
    });
  }

  return {
    signin,
  };
}

export default AuthRepository;
