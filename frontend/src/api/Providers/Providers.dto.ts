import type { ProviderType } from "@entities";

export type UpsertProviderDTO = {
  name: string;
  nameFilter?: string;
  cnpj?: string;
  im?: string;
  ie?: string;
  email?: string;
  cep?: string;
  address?: string;
  district?: string;
  city?: string;
  region?: string;
  phone1?: string;
  phone2?: string;
  obs?: string;
  type?: ProviderType;
  active?: boolean;
};
