import { toNameFilter, type Architect } from "@entities";
import * as Yup from "yup";
import type { UpsertArchitectDTO } from "@/api/Architects";

export type ArchitectFormSchema = {
  name: string;
  cpf: string;
  nasc: string;
  email: string;
  cep: string;
  address: string;
  district: string;
  city: string;
  region: string;
  phone1: string;
  phone2: string;
  obs: string;
  active: boolean;
  sellerId: string;
};

export const emptyArchitectFormValues: ArchitectFormSchema = {
  name: "",
  cpf: "",
  nasc: "",
  email: "",
  cep: "",
  address: "",
  district: "",
  city: "",
  region: "",
  phone1: "",
  phone2: "",
  obs: "",
  active: true,
  sellerId: "",
};

export const architectValidationSchema = Yup.object<ArchitectFormSchema>({
  name: Yup.string().trim().max(255).required("Nome é obrigatório"),
  cpf: Yup.string().trim().max(20),
  nasc: Yup.string().trim(),
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
  active: Yup.boolean().required(),
  sellerId: Yup.string().trim().required("Selecione o vendedor"),
});

function optionalField(value: string): string | undefined {
  const trimmed = value.trim();
  return trimmed ? trimmed : undefined;
}

function toDateInputValue(nasc: string | null): string {
  if (!nasc) return "";
  return nasc.split("T")[0] ?? "";
}

export function architectToFormValues(architect: Architect): ArchitectFormSchema {
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
    phone1: architect.phone1 ?? "",
    phone2: architect.phone2 ?? "",
    obs: architect.obs ?? "",
    active: architect.active,
    sellerId: architect.sellerId,
  };
}

export function formValuesToUpsertArchitectDTO(
  values: ArchitectFormSchema,
): UpsertArchitectDTO {
  const name = values.name.trim();
  const nasc = values.nasc.trim();

  return {
    name,
    nameFilter: toNameFilter(name),
    cpf: optionalField(values.cpf),
    nasc: nasc ? nasc : null,
    email: optionalField(values.email)?.toLowerCase(),
    cep: optionalField(values.cep),
    address: optionalField(values.address),
    district: optionalField(values.district),
    city: optionalField(values.city),
    region: optionalField(values.region)?.toUpperCase(),
    phone1: optionalField(values.phone1),
    phone2: optionalField(values.phone2),
    obs: optionalField(values.obs),
    active: values.active,
    sellerId: values.sellerId,
  };
}
