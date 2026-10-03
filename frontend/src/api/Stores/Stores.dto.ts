import type { AddressDTO } from "@/api/types/address.dto";

export type UpsertStoreDTO = {
  name: string;
  email?: string;
  address?: AddressDTO;
  phone1?: string;
  phone2?: string;
  obs?: string;
  managerId?: string | null;
};
