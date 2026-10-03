import type { AddressDTO } from "@/api/types/address.dto";
import type { ListNameActiveParams } from "@/types/list-params";
import type { ProviderType } from "@entities";

export type ListProvidersParams = ListNameActiveParams;

export type UpsertProviderDTO = {
  name: string;
  nameFilter?: string;
  cnpj?: string;
  im?: string;
  ie?: string;
  email?: string;
  address?: AddressDTO;
  phone1?: string;
  phone2?: string;
  obs?: string;
  type?: ProviderType;
  active?: boolean;
};
