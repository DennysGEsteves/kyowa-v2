import type { ClientOrigin, InterestProduct } from "@entities";

export type UpsertClientDTO = {
  name: string;
  nameFilter?: string;
  cpf?: string;
  rg?: string;
  architectId?: string | null;
  nasc?: string | null;
  occupation?: string;
  email?: string;
  cep?: string;
  address?: string;
  district?: string;
  city?: string;
  region?: string;
  phone1?: string;
  phone2?: string;
  obs?: string;
  active?: boolean;
  interestProducts?: InterestProduct[];
  origins?: ClientOrigin[];
  entry?: string;
};
