import type { InterestProductType, OriginType } from "@/types";

export interface IForm {
  name: string;
  email?: string;
  address?: string;
  phone?: string;
  cpf?: string;
  rg?: string;
  birthday?: string;
  occupation?: string;
  interestProducts?: InterestProductType[];
  origins?: OriginType[];
  architectId?: string;
  obs?: string;
}
