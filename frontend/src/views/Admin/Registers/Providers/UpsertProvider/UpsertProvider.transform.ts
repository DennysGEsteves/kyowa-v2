import { formatPhoneBR } from "@/util/masks";
import type { Provider } from "@entities";
import type { UpsertProviderDTO } from "@/api/Providers";
import type { ProviderFormSchema } from "./UpsertProvider.schema";

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
    phone1: formatPhoneBR(provider.phone1 ?? ""),
    phone2: formatPhoneBR(provider.phone2 ?? ""),
    obs: provider.obs ?? "",
    type: provider.type ?? "",
    active: provider.active,
  };
}

export function formValuesToUpsertProviderDTO(
  values: ProviderFormSchema,
): UpsertProviderDTO {
  return {
    name: values.name,
    cnpj: values.cnpj,
    im: values.im,
    ie: values.ie,
    email: values.email.toLowerCase(),
    cep: values.cep,
    address: values.address,
    district: values.district,
    city: values.city,
    region: values.region.toUpperCase(),
    phone1: values.phone1,
    phone2: values.phone2,
    obs: values.obs,
    type: values.type || undefined,
    active: values.active,
  };
}
