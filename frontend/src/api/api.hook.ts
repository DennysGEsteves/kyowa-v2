import { ArchitectsApi } from "./Architects";
import { AuthApi } from "./Auth";
import { ClientsApi } from "./Clients";
import { ProductLookupsApi } from "./ProductLookups";
import { ProductsApi } from "./Products";
import { ProvidersApi } from "./Providers";
import { SealsApi } from "./Seals";
import { StockApi } from "./Stock";
import { StoresApi } from "./Stores";
import { UsersApi } from "./Users";

export function useApi() {
  return {
    architectsApi: ArchitectsApi(),
    authApi: AuthApi(),
    clientsApi: ClientsApi(),
    productLookupsApi: ProductLookupsApi(),
    productsApi: ProductsApi(),
    providersApi: ProvidersApi(),
    sealsApi: SealsApi(),
    stockApi: StockApi(),
    storesApi: StoresApi(),
    usersApi: UsersApi(),
  };
}
