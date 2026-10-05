import { UpsertStoreDTO } from "@/api/Stores/Stores.dto";
import {
  addressToFormValues,
  formValuesToAddressPayload,
} from "@/utils/address/formAddress";
import { formatPhoneBR } from "@/utils/masks";
import { type Store } from "@entities";
import { StoreFormSchema } from "./UpsertStore.schema";

export function storeToFormValues(store: Store): StoreFormSchema {
  return {
    name: store.name,
    email: store.email ?? "",
    address: addressToFormValues(store.address),
    phone1: formatPhoneBR(store.phone1 ?? ""),
    phone2: formatPhoneBR(store.phone2 ?? ""),
    obs: store.obs ?? "",
    managerId: store.managerId ?? "",
  };
}

export function formValuesToUpsertStoreDTO(
  values: StoreFormSchema,
): UpsertStoreDTO {
  return {
    name: values.name,
    email: values.email.toLowerCase(),
    address: formValuesToAddressPayload(values.address),
    phone1: values.phone1,
    phone2: values.phone2,
    obs: values.obs,
    managerId: values.managerId || undefined,
  };
}
