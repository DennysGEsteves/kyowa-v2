import type { AddressDTO } from "@/api/types/address.dto";
import type { ListNameActiveParams } from "@/types/list-params";
import type { ClientOrigin, InterestProduct } from "@entities";

export type ListClientsParams = ListNameActiveParams & {
  cpf?: string;
};

export type UpsertClientDTO = {
  name: string;
  nameFilter?: string;
  cpf?: string;
  rg?: string;
  architectId?: string | null;
  nasc?: string | null;
  occupation?: string;
  email?: string;
  address?: AddressDTO;
  phone1?: string;
  phone2?: string;
  obs?: string;
  active?: boolean;
  interestProducts?: InterestProduct[];
  origins?: ClientOrigin[];
  entry?: string;
};
