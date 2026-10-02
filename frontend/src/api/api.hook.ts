import { AuthApi } from "./Auth";
import { ProvidersApi } from "./Providers";
import { StoresApi } from "./Stores";
import { UsersApi } from "./Users";

export function useApi() {
  return {
    authApi: AuthApi(),
    providersApi: ProvidersApi(),
    storesApi: StoresApi(),
    usersApi: UsersApi(),
  };
}
