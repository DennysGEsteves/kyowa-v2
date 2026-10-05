import { addressFormValidationSchema } from "@/components/Form/addressValidation";
import {
  emptyAddressFormValues,
  type AddressFormValues,
} from "@/utils/address/formAddress";
import { providerTypes, type ProviderType } from "@entities";
import * as Yup from "yup";

export type ProviderFormSchema = {
  name: string;
  cnpj: string;
  im: string;
  ie: string;
  email: string;
  address: AddressFormValues;
  phone1: string;
  phone2: string;
  obs: string;
  type: ProviderType | "";
  active: boolean;
};

export const emptyProviderFormValues: ProviderFormSchema = {
  name: "",
  cnpj: "",
  im: "",
  ie: "",
  email: "",
  address: emptyAddressFormValues(),
  phone1: "",
  phone2: "",
  obs: "",
  type: "",
  active: true,
};

export const providerValidationSchema = Yup.object<ProviderFormSchema>({
  name: Yup.string().max(255).required("Nome é obrigatório"),
  cnpj: Yup.string().max(20),
  im: Yup.string().max(20),
  ie: Yup.string().max(20),
  email: Yup.string()
    .email("E-mail inválido")
    .max(50)
    .required("E-mail é obrigatório"),
  address: addressFormValidationSchema,
  phone1: Yup.string().max(15),
  phone2: Yup.string().max(15),
  obs: Yup.string(),
  type: Yup.mixed<ProviderType | "">()
    .oneOf([...providerTypes, ""])
    .required(),
  active: Yup.boolean().required(),
});
