import type { Client } from "@entities";
import type { UpsertClientDTO } from "@/api/Clients";
import type { ClientFormSchema } from "./Clients.schema";

function toDateInputValue(date: string | null): string {
  if (!date) return "";
  return date.split("T")[0] ?? "";
}

export function clientToFormValues(client: Client): ClientFormSchema {
  return {
    name: client.name,
    cpf: client.cpf ?? "",
    rg: client.rg ?? "",
    architectId: client.architectId ?? "",
    nasc: toDateInputValue(client.nasc),
    occupation: client.occupation ?? "",
    email: client.email ?? "",
    cep: client.cep ?? "",
    address: client.address ?? "",
    district: client.district ?? "",
    city: client.city ?? "",
    region: client.region ?? "",
    phone1: client.phone1 ?? "",
    phone2: client.phone2 ?? "",
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
    cep: values.cep,
    address: values.address,
    district: values.district,
    city: values.city,
    region: values.region.toUpperCase(),
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
