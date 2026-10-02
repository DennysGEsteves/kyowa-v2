import { userPermissions, type UserPermission } from "@entities";
import * as Yup from "yup";

export interface formSchema {
  name: string;
  email: string;
  phone: string;
  login: string;
  permission: UserPermission;
  storeId?: string;
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
  storeId: Yup.string().trim().optional(),
  active: Yup.boolean().required("Status é obrigatório"),
});
