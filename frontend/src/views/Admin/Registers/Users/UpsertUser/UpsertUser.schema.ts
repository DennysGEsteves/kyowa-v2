import { userPermissions, type UserPermission } from "@entities";
import * as Yup from "yup";

export type UserFormSchema = {
  name: string;
  email: string;
  phone: string;
  login: string;
  permission: UserPermission | "";
  storeId: string;
  active: boolean;
};

export const emptyUserFormValues: UserFormSchema = {
  name: "",
  email: "",
  phone: "",
  login: "",
  permission: "",
  storeId: "",
  active: true,
};

export const userValidationSchema = Yup.object<UserFormSchema>({
  name: Yup.string().max(50).required("Nome é obrigatório"),
  email: Yup.string()
    .email("E-mail inválido")
    .max(50)
    .required("E-mail é obrigatório"),
  phone: Yup.string().max(50).required("Telefone é obrigatório"),
  login: Yup.string().max(50).required("Login é obrigatório"),
  permission: Yup.mixed<UserPermission | "">()
    .oneOf([...userPermissions, ""], "Permissão inválida")
    .test("required", "Permissão é obrigatória", (value) => value !== ""),
  storeId: Yup.string(),
  active: Yup.boolean().required("Status é obrigatório"),
});
