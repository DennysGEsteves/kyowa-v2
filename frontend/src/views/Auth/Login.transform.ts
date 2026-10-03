import type { LoginFormSchema } from "./Login.schema";

export type LoginRequest = {
  email: string;
  password: string;
};

export function formValuesToLoginRequest(
  values: LoginFormSchema,
): LoginRequest {
  return {
    email: values.email.toLowerCase(),
    password: values.password,
  };
}
