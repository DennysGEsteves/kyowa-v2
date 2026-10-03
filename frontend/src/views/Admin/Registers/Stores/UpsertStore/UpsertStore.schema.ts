import { addressFormValidationSchema } from "@/components/Form/addressValidation";
import {
  emptyAddressFormValues,
  type AddressFormValues,
} from "@/util/address/formAddress";
import * as Yup from "yup";

export type StoreFormSchema = {
  name: string;
  email: string;
  address: AddressFormValues;
  phone1: string;
  phone2: string;
  obs: string;
  managerId: string;
};

export const emptyStoreFormValues: StoreFormSchema = {
  name: "",
  email: "",
  address: emptyAddressFormValues(),
  phone1: "",
  phone2: "",
  obs: "",
  managerId: "",
};

export const storeValidationSchema = Yup.object<StoreFormSchema>({
  name: Yup.string().max(255).required("Nome é obrigatório"),
  email: Yup.string()
    .max(50)
    .test(
      "email",
      "E-mail inválido",
      (value) => !value || Yup.string().email().isValidSync(value),
    ),
  address: addressFormValidationSchema,
  phone1: Yup.string().max(15),
  phone2: Yup.string().max(15),
  obs: Yup.string(),
  managerId: Yup.string(),
});
