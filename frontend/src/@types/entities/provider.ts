import type { Address } from "./address";

export type ProviderType = "product" | "service";

export type Provider = {
  id: string;
  name: string;
  nameFilter: string;
  cnpj: string | null;
  im: string | null;
  ie: string | null;
  email: string | null;
  address: Address | null;
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

export const providerTypes: ProviderType[] = ["product", "service"];

export function formatProviderType(type: ProviderType | null): string {
  if (!type) return "—";
  return providerTypeLabels[type];
}
