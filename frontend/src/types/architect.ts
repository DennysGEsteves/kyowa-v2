import type { User } from "./user";

export type Architect = {
  mid?: string;
  id?: number;
  name: string;
  nameFilter?: string;
  cpf?: string;
  birthday?: string;
  email?: string;
  address?: string;
  phone?: string;
  obs?: string;
  active?: boolean;
  sellerId?: string;

  seller?: User;
  // clients?: ClientEntity[];
};
