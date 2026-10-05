import * as Yup from "yup";

export type LoginFormSchema = {
  email: string;
  password: string;
};

export const loginFormInitialValues: LoginFormSchema = {
  email: "",
  password: "",
};

export const loginValidationSchema = Yup.object<LoginFormSchema>({
  email: Yup.string()
    .email("E-mail inválido")
    .max(50)
    .required("E-mail é obrigatório"),
  password: Yup.string()
    .min(1, "Senha é obrigatória")
    .max(50)
    .required("Senha é obrigatória"),
});
