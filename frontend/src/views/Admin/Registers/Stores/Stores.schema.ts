import type { Store } from "@entities";
import * as Yup from "yup";
import type { UpsertStoreDTO } from "@/api/Stores";

export type StoreFormSchema = {
  name: string;
  email: string;
  cep: string;
  address: string;
  district: string;
  city: string;
  region: string;
  phone1: string;
  phone2: string;
  obs: string;
  managerId: string;
};

export const emptyStoreFormValues: StoreFormSchema = {
  name: "",
  email: "",
  cep: "",
  address: "",
  district: "",
  city: "",
  region: "",
  phone1: "",
  phone2: "",
  obs: "",
  managerId: "",
};

const mongoIdPattern = /^[a-f\d]{24}$/i;

export const storeValidationSchema = Yup.object<StoreFormSchema>({
  name: Yup.string().trim().max(255).required("Nome é obrigatório"),
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
  managerId: Yup.string()
    .trim()
    .test(
      "managerId",
      "Gerente inválido",
      (value) => !value || mongoIdPattern.test(value),
    ),
});

function optionalField(value: string): string | undefined {
  const trimmed = value.trim();
  return trimmed ? trimmed : undefined;
}

export function storeToFormValues(store: Store): StoreFormSchema {
  return {
    name: store.name,
    email: store.email ?? "",
    cep: store.cep ?? "",
    address: store.address ?? "",
    district: store.district ?? "",
    city: store.city ?? "",
    region: store.region ?? "",
    phone1: store.phone1 ?? "",
    phone2: store.phone2 ?? "",
    obs: store.obs ?? "",
    managerId: store.managerId ?? "",
  };
}

export function formValuesToUpsertStoreDTO(
  values: StoreFormSchema,
  isUpdate = false,
): UpsertStoreDTO {
  const managerId = values.managerId.trim();

  const dto: UpsertStoreDTO = {
    name: values.name.trim(),
    email: optionalField(values.email)?.toLowerCase(),
    cep: optionalField(values.cep),
    address: optionalField(values.address),
    district: optionalField(values.district),
    city: optionalField(values.city),
    region: optionalField(values.region)?.toUpperCase(),
    phone1: optionalField(values.phone1),
    phone2: optionalField(values.phone2),
    obs: optionalField(values.obs),
  };

  if (managerId) {
    dto.managerId = managerId;
  } else if (isUpdate) {
    dto.managerId = null;
  }

  return dto;
}
