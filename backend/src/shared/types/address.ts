export interface Address {
  cep: string | null;
  street: string | null;
  number: string | null;
  district: string | null;
  city: string | null;
  region: string | null;
}

export type AddressInput = {
  cep?: string | null;
  street?: string | null;
  number?: string | null;
  district?: string | null;
  city?: string | null;
  region?: string | null;
};

export function toAddress(input?: AddressInput | null): Address | null {
  if (!input) {
    return null;
  }

  return {
    cep: input.cep ?? null,
    street: input.street ?? null,
    number: input.number ?? null,
    district: input.district ?? null,
    city: input.city ?? null,
    region: input.region ?? null,
  };
}
