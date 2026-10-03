import * as Yup from "yup";

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

export const storeValidationSchema = Yup.object<StoreFormSchema>({
  name: Yup.string().max(255).required("Nome é obrigatório"),
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
  managerId: Yup.string(),
});
