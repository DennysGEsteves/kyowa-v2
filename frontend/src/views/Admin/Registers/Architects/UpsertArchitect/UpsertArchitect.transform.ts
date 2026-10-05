import {
  addressToFormValues,
  formValuesToAddressPayload,
} from "@/utils/address/formAddress";
import { formatCpfBR, formatPhoneBR } from "@/utils/masks";
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
    cpf: formatCpfBR(architect.cpf ?? ""),
    nasc: toDateInputValue(architect.nasc),
    email: architect.email ?? "",
    address: addressToFormValues(architect.address),
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
    address: formValuesToAddressPayload(values.address),
    phone1: values.phone1,
    phone2: values.phone2,
    obs: values.obs,
    active: values.active,
    sellerId: values.sellerId,
  };
}
