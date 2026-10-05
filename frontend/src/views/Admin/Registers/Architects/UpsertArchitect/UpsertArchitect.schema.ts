import { addressFormValidationSchema } from "@/components/Form/addressValidation";
import {
  emptyAddressFormValues,
  type AddressFormValues,
} from "@/utils/address/formAddress";
import * as Yup from "yup";

export type ArchitectFormSchema = {
  name: string;
  cpf: string;
  nasc: string;
  email: string;
  address: AddressFormValues;
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
  address: emptyAddressFormValues(),
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
  address: addressFormValidationSchema,
  phone1: Yup.string().max(15),
  phone2: Yup.string().max(15),
  obs: Yup.string(),
  active: Yup.boolean().required(),
  sellerId: Yup.string().required("Selecione o vendedor"),
});
