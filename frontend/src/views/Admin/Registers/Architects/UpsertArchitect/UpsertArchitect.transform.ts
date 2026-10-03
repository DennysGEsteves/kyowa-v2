import { formatPhoneBR } from "@/util/masks";
import type { Architect } from "@entities";
import type { UpsertArchitectDTO } from "@/api/Architects";
import type { ArchitectFormSchema } from "./UpsertArchitect.schema";

function toDateInputValue(nasc: string | null): string {
  if (!nasc) return "";
  return nasc.split("T")[0] ?? "";
}

export function architectToFormValues(
  architect: Architect,
): ArchitectFormSchema {
  return {
    name: architect.name,
    cpf: architect.cpf ?? "",
    nasc: toDateInputValue(architect.nasc),
    email: architect.email ?? "",
    cep: architect.cep ?? "",
    address: architect.address ?? "",
    district: architect.district ?? "",
    city: architect.city ?? "",
    region: architect.region ?? "",
    phone1: formatPhoneBR(architect.phone1 ?? ""),
    phone2: formatPhoneBR(architect.phone2 ?? ""),
    obs: architect.obs ?? "",
    active: architect.active,
    sellerId: architect.sellerId,
  };
}

export function formValuesToUpsertArchitectDTO(
  values: ArchitectFormSchema,
): UpsertArchitectDTO {
  return {
    name: values.name,
    cpf: values.cpf,
    nasc: values.nasc ? values.nasc : null,
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
    sellerId: values.sellerId,
  };
}
