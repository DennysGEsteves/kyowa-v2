import * as Yup from "yup";
import type { AddressFormValues } from "@/utils/address/formAddress";

export const addressFormValidationSchema = Yup.object<AddressFormValues>({
  cep: Yup.string().max(10),
  street: Yup.string().max(255),
  number: Yup.string().max(20),
  district: Yup.string().max(50),
  city: Yup.string().max(50),
  region: Yup.string().max(2),
});
