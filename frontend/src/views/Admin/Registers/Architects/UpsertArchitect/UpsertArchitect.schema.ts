import * as Yup from "yup";

export type ArchitectFormSchema = {
  name: string;
  cpf: string;
  nasc: string;
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
  sellerId: string;
};

export const emptyArchitectFormValues: ArchitectFormSchema = {
  name: "",
  cpf: "",
  nasc: "",
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
  sellerId: "",
};

export const architectValidationSchema = Yup.object<ArchitectFormSchema>({
  name: Yup.string().max(255).required("Nome é obrigatório"),
  cpf: Yup.string().max(20),
  nasc: Yup.string(),
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
  sellerId: Yup.string().required("Selecione o vendedor"),
});
