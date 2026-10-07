import type { AddressDTO } from "@/api/types/address.dto";
import type { ListNameActiveParams } from "@types/list-params";

export type ListArchitectsParams = ListNameActiveParams;

export type UpsertArchitectDTO = {
  name: string;
  nameFilter?: string;
  cpf?: string;
  nasc?: string | null;
  email?: string;
  address?: AddressDTO;
  phone1?: string;
  phone2?: string;
  obs?: string;
  active?: boolean;
  sellerId: string;
};
