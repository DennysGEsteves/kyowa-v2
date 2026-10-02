export type ProviderType = "product" | "service";

export type Provider = {
  id: string;
  name: string;
  nameFilter: string;
  cnpj: string | null;
  im: string | null;
  ie: string | null;
  email: string | null;
  cep: string | null;
  address: string | null;
  district: string | null;
  city: string | null;
  region: string | null;
  phone1: string | null;
  phone2: string | null;
  obs: string | null;
  type: ProviderType | null;
  active: boolean;
};

export const providerTypeLabels: Record<ProviderType, string> = {
  product: "Produto",
  service: "Serviço",
};

export const providerTypes = Object.keys(
  providerTypeLabels,
) as ProviderType[];

export type ProviderFormValues = {
  name: string;
  cnpj: string;
  im: string;
  ie: string;
  email: string;
  cep: string;
  address: string;
  district: string;
  city: string;
  region: string;
  phone1: string;
  phone2: string;
  obs: string;
  type: ProviderType | "";
  active: boolean;
};

export function toNameFilter(name: string): string {
  return name.trim().toLowerCase().slice(0, 100);
}
