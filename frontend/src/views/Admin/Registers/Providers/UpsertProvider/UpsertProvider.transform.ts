import {
  addressToFormValues,
  formValuesToAddressPayload,
} from "@/util/address/formAddress";
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
    address: addressToFormValues(provider.address),
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
    email: values.email.trim().toLowerCase(),
    address: formValuesToAddressPayload(values.address),
    phone1: values.phone1,
    phone2: values.phone2,
    obs: values.obs,
    type: values.type || undefined,
    active: values.active,
  };
}
