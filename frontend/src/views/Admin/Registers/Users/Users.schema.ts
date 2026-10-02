import { userPermissions, type UserPermission } from "@entities/user";
import * as Yup from "yup";

export interface formSchema {
  name: string;
  email: string;
  phone: string;
  login: string;
  permission: UserPermission;
  storeId: number;
  active: boolean;
}

export const userValidationSchema = Yup.object<formSchema>({
  name: Yup.string().trim().max(50).required("Nome é obrigatório"),
  email: Yup.string()
    .trim()
    .email("E-mail inválido")
    .max(50)
    .required("E-mail é obrigatório"),
  phone: Yup.string().trim().max(50).required("Telefone é obrigatório"),
  login: Yup.string().trim().max(50).required("Login é obrigatório"),
  permission: Yup.mixed<UserPermission>()
    .oneOf([...userPermissions], "Permissão inválida")
    .required("Permissão é obrigatória"),
  storeId: Yup.number()
    .typeError("ID da loja é obrigatório")
    .integer()
    .min(1, "Informe uma loja válida")
    .required("ID da loja é obrigatório"),
  active: Yup.boolean().required("Status é obrigatório"),
});
