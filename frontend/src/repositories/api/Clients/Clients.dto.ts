import type { InterestProductType, OriginType } from "@/@types";

export type UpsertClientDTO = {
  mid?: string;
  name: string;
  cpf?: string;
  rg?: string;
  birthday?: string;
  occupation?: string;
  email?: string;
  address?: string;
  phone?: string;
  obs?: string;
  interestProducts?: InterestProductType[];
  origins?: OriginType[];
  architectId?: string;
};
