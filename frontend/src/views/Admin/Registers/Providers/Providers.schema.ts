import { providerTypes, type ProviderType } from "@entities";
import * as Yup from "yup";

export type ProviderFormSchema = {
  name: string;
  cnpj: string;
  im: string;
  ie: string;
  email: string;
  cep: string;
  address: string;
  district: string;
  city: string;
  region: string;
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
  cep: "",
  address: "",
  district: "",
  city: "",
  region: "",
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
    .max(50)
    .test(
      "email",
      "E-mail inválido",
      (value) => !value || Yup.string().email().isValidSync(value),
    ),
  cep: Yup.string().max(10),
  address: Yup.string().max(255),
  district: Yup.string().max(50),
  city: Yup.string().max(50),
  region: Yup.string().max(2),
  phone1: Yup.string().max(15),
  phone2: Yup.string().max(15),
  obs: Yup.string(),
  type: Yup.mixed<ProviderType | "">().oneOf(
    ["", ...providerTypes],
    "Tipo inválido",
  ),
  active: Yup.boolean().required(),
});
