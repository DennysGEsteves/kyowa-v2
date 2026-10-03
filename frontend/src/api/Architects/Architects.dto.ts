export type UpsertArchitectDTO = {
  name: string;
  nameFilter?: string;
  cpf?: string;
  nasc?: string | null;
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
  sellerId: string;
};
