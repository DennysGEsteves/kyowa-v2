import type { Address } from "./address";

export type Architect = {
  id: string;
  name: string;
  nameFilter: string;
  cpf: string | null;
  nasc: string | null;
  email: string | null;
  address: Address | null;
  phone1: string | null;
  phone2: string | null;
  obs: string | null;
  active: boolean;
  sellerId: string;
};
