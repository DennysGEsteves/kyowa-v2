import { type Store } from "@entities";
import { UpsertStoreDTO } from "@/api/Stores/Stores.dto";
import { StoreFormSchema } from "./Stores.schema";

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
  return {
    name: values.name,
    email: values.email.toLowerCase(),
    cep: values.cep,
    address: values.address,
    district: values.district,
    city: values.city,
    region: values.region.toUpperCase(),
    phone1: values.phone1,
    phone2: values.phone2,
    obs: values.obs,
    managerId: values.managerId
      ? values.managerId
      : isUpdate
        ? null
        : undefined,
  };
}
