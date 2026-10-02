import {
  providerTypes,
  toNameFilter,
  type Provider,
  type ProviderType,
} from "@entities";
import * as Yup from "yup";
import type { UpsertProviderDTO } from "@/api/Providers";

export type ProviderFormSchema = {
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

export const emptyProviderFormValues: ProviderFormSchema = {
  name: "",
  cnpj: "",
  im: "",
  ie: "",
  email: "",
  cep: "",
  address: "",
  district: "",
  city: "",
  region: "",
  phone1: "",
  phone2: "",
  obs: "",
  type: "",
  active: true,
};

export const providerValidationSchema = Yup.object<ProviderFormSchema>({
  name: Yup.string().trim().max(255).required("Nome é obrigatório"),
  cnpj: Yup.string().trim().max(20),
  im: Yup.string().trim().max(20),
  ie: Yup.string().trim().max(20),
  email: Yup.string()
    .trim()
    .max(50)
    .test(
      "email",
      "E-mail inválido",
      (value) => !value || Yup.string().email().isValidSync(value),
    ),
  cep: Yup.string().trim().max(10),
  address: Yup.string().trim().max(255),
  district: Yup.string().trim().max(50),
  city: Yup.string().trim().max(50),
  region: Yup.string().trim().max(2),
  phone1: Yup.string().trim().max(15),
  phone2: Yup.string().trim().max(15),
  obs: Yup.string().trim(),
  type: Yup.mixed<ProviderType | "">().oneOf(
    ["", ...providerTypes],
    "Tipo inválido",
  ),
  active: Yup.boolean().required(),
});

function optionalField(value: string): string | undefined {
  const trimmed = value.trim();
  return trimmed ? trimmed : undefined;
}

export function providerToFormValues(provider: Provider): ProviderFormSchema {
  return {
    name: provider.name,
    cnpj: provider.cnpj ?? "",
    im: provider.im ?? "",
    ie: provider.ie ?? "",
    email: provider.email ?? "",
    cep: provider.cep ?? "",
    address: provider.address ?? "",
    district: provider.district ?? "",
    city: provider.city ?? "",
    region: provider.region ?? "",
    phone1: provider.phone1 ?? "",
    phone2: provider.phone2 ?? "",
    obs: provider.obs ?? "",
    type: provider.type ?? "",
    active: provider.active,
  };
}

export function formValuesToUpsertProviderDTO(
  values: ProviderFormSchema,
): UpsertProviderDTO {
  const name = values.name.trim();

  return {
    name,
    nameFilter: toNameFilter(name),
    cnpj: optionalField(values.cnpj),
    im: optionalField(values.im),
    ie: optionalField(values.ie),
    email: optionalField(values.email)?.toLowerCase(),
    cep: optionalField(values.cep),
    address: optionalField(values.address),
    district: optionalField(values.district),
    city: optionalField(values.city),
    region: optionalField(values.region)?.toUpperCase(),
    phone1: optionalField(values.phone1),
    phone2: optionalField(values.phone2),
    obs: optionalField(values.obs),
    type: values.type || undefined,
    active: values.active,
  };
}
