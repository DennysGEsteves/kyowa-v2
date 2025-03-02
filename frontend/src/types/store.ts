import type { User } from "./user";

export type Store = {
  mid: string;
  id: number;
  name: string;
  email?: string;
  cep?: string;
  address?: string;
  district?: string;
  city?: string;
  region?: string;
  phone1?: string;
  phone2?: string;
  obs?: string;
  managerId?: string;

  manager?: User;
};
