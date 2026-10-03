import {
  clientOrigins,
  interestProducts,
  toNameFilter,
  type Client,
  type ClientOrigin,
  type InterestProduct,
} from "@entities";
import * as Yup from "yup";
import type { UpsertClientDTO } from "@/api/Clients";

export type ClientFormSchema = {
  name: string;
  cpf: string;
  rg: string;
  architectId: string;
  nasc: string;
  occupation: string;
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
  interestProducts: InterestProduct[];
  origins: ClientOrigin[];
  entry: string;
};

function todayDateInputValue(): string {
  return new Date().toISOString().split("T")[0] ?? "";
}

export const emptyClientFormValues: ClientFormSchema = {
  name: "",
  cpf: "",
  rg: "",
  architectId: "",
  nasc: "",
  occupation: "",
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
  interestProducts: [],
  origins: [],
  entry: todayDateInputValue(),
};

export const clientValidationSchema = Yup.object<ClientFormSchema>({
  name: Yup.string().trim().max(255).required("Nome é obrigatório"),
  cpf: Yup.string().trim().max(20),
  rg: Yup.string().trim().max(20),
  architectId: Yup.string().trim(),
  nasc: Yup.string().trim(),
  occupation: Yup.string().trim().max(50),
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
  interestProducts: Yup.array()
    .of(Yup.mixed<InterestProduct>().oneOf([...interestProducts]))
    .default([]),
  origins: Yup.array()
    .of(Yup.mixed<ClientOrigin>().oneOf([...clientOrigins]))
    .default([]),
  entry: Yup.string().trim().required("Data de entrada é obrigatória"),
});

function optionalField(value: string): string | undefined {
  const trimmed = value.trim();
  return trimmed ? trimmed : undefined;
}

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
  const name = values.name.trim();
  const nasc = values.nasc.trim();
  const architectId = values.architectId.trim();
  const entry = values.entry.trim();

  const dto: UpsertClientDTO = {
    name,
    nameFilter: toNameFilter(name),
    cpf: optionalField(values.cpf),
    rg: optionalField(values.rg),
    nasc: nasc ? nasc : null,
    occupation: optionalField(values.occupation),
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
    interestProducts: values.interestProducts.length
      ? values.interestProducts
      : undefined,
    origins: values.origins.length ? values.origins : undefined,
    entry: entry || undefined,
  };

  if (architectId) {
    dto.architectId = architectId;
  } else if (isUpdate) {
    dto.architectId = null;
  }

  return dto;
}
