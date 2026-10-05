import { digitsOnly } from "@/utils/masks";

export type AddressByCep = {
  street: string;
  district: string;
  city: string;
  region: string;
};

type ViaCepResponse = {
  erro?: boolean;
  logradouro?: string;
  bairro?: string;
  localidade?: string;
  uf?: string;
};

export async function fetchAddressByCep(
  cep: string,
): Promise<AddressByCep | null> {
  const digits = digitsOnly(cep);
  if (digits.length !== 8) {
    return null;
  }

  try {
    const response = await fetch(
      `https://viacep.com.br/ws/${digits}/json/`,
    );

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as ViaCepResponse;
    if (data.erro) {
      return null;
    }

    return {
      street: data.logradouro?.trim() ?? "",
      district: data.bairro?.trim() ?? "",
      city: data.localidade?.trim() ?? "",
      region: data.uf?.trim().toUpperCase() ?? "",
    };
  } catch {
    return null;
  }
}
