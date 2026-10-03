import {
  clientOrigins,
  interestProducts,
  type ClientOrigin,
  type InterestProduct,
} from "@entities";
import * as Yup from "yup";

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
  name: Yup.string().max(255).required("Nome é obrigatório"),
  cpf: Yup.string().max(20),
  rg: Yup.string().max(20),
  architectId: Yup.string(),
  nasc: Yup.string(),
  occupation: Yup.string().max(50),
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
  active: Yup.boolean().required(),
  interestProducts: Yup.array()
    .of(Yup.mixed<InterestProduct>().oneOf([...interestProducts]))
    .default([]),
  origins: Yup.array()
    .of(Yup.mixed<ClientOrigin>().oneOf([...clientOrigins]))
    .default([]),
  entry: Yup.string().required("Data de entrada é obrigatória"),
});
