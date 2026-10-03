export type Architect = {
  id: string;
  name: string;
  nameFilter: string;
  cpf: string | null;
  nasc: string | null;
  email: string | null;
  cep: string | null;
  address: string | null;
  district: string | null;
  city: string | null;
  region: string | null;
  phone1: string | null;
  phone2: string | null;
  obs: string | null;
  active: boolean;
  sellerId: string;
};
