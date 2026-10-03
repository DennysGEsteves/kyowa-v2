import { ArchitectsApi } from "./Architects";
import { AuthApi } from "./Auth";
import { ClientsApi } from "./Clients";
import { ProvidersApi } from "./Providers";
import { StoresApi } from "./Stores";
import { UsersApi } from "./Users";

export function useApi() {
  return {
    architectsApi: ArchitectsApi(),
    authApi: AuthApi(),
    clientsApi: ClientsApi(),
    providersApi: ProvidersApi(),
    storesApi: StoresApi(),
    usersApi: UsersApi(),
  };
}
