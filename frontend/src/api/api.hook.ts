import { ArchitectsApi } from "./Architects";
import { BudgetsApi } from "./Budgets";
import { AuthApi } from "./Auth";
import { ClientsApi } from "./Clients";
import { ProductLookupsApi } from "./ProductLookups";
import { ProductsApi } from "./Products";
import { ProvidersApi } from "./Providers";
import { SalesApi } from "./Sales";
import { SealsApi } from "./Seals";
import { StockApi } from "./Stock";
import { StoresApi } from "./Stores";
import { UsersApi } from "./Users";

export function useApi() {
  return {
    architectsApi: ArchitectsApi(),
    budgetsApi: BudgetsApi(),
    authApi: AuthApi(),
    clientsApi: ClientsApi(),
    productLookupsApi: ProductLookupsApi(),
    productsApi: ProductsApi(),
    providersApi: ProvidersApi(),
    salesApi: SalesApi(),
    sealsApi: SealsApi(),
    stockApi: StockApi(),
    storesApi: StoresApi(),
    usersApi: UsersApi(),
  };
}
