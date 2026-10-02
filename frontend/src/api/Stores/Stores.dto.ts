export type UpsertStoreDTO = {
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
  managerId?: string | null;
};
