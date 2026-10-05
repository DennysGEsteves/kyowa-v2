import {
  addressToFormValues,
  formValuesToAddressPayload,
} from "@/utils/address/formAddress";
import { formatCpfBR, formatPhoneBR, formatRgBR } from "@/utils/masks";
import type { Client } from "@entities";
import type { UpsertClientDTO } from "@/api/Clients";
import type { ClientFormSchema } from "./UpsertClient.schema";

function toDateInputValue(date: string | null): string {
  if (!date) return "";
  return date.split("T")[0] ?? "";
}

export function clientToFormValues(client: Client): ClientFormSchema {
  return {
    name: client.name,
    cpf: formatCpfBR(client.cpf ?? ""),
    rg: formatRgBR(client.rg ?? ""),
    architectId: client.architectId ?? "",
    nasc: toDateInputValue(client.nasc),
    occupation: client.occupation ?? "",
    email: client.email ?? "",
    address: addressToFormValues(client.address),
    phone1: formatPhoneBR(client.phone1 ?? ""),
    phone2: formatPhoneBR(client.phone2 ?? ""),
    obs: client.obs ?? "",
    active: client.active,
    interestProducts: client.interestProducts ?? [],
    origins: client.origins ?? [],
    entry: toDateInputValue(client.entry),
  };
}

export function formValuesToUpsertClientDTO(
  values: ClientFormSchema,
  isUpdate = false,
): UpsertClientDTO {
  return {
    name: values.name,
    cpf: values.cpf,
    rg: values.rg,
    architectId: values.architectId
      ? values.architectId
      : isUpdate
        ? null
        : undefined,
    nasc: values.nasc ? values.nasc : null,
    occupation: values.occupation,
    email: values.email.toLowerCase(),
    address: formValuesToAddressPayload(values.address),
    phone1: values.phone1,
    phone2: values.phone2,
    obs: values.obs,
    active: values.active,
    interestProducts: values.interestProducts.length
      ? values.interestProducts
      : undefined,
    origins: values.origins.length ? values.origins : undefined,
    entry: values.entry || undefined,
  };
}
