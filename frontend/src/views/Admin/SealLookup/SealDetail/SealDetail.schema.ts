import * as Yup from "yup";

export type SealDetailFormSchema = {
  number: string;
  storeId: string;
  productId: string;
};

export const sealDetailValidationSchema = Yup.object<SealDetailFormSchema>({
  number: Yup.string()
    .required("Informe o novo número do lacre")
    .test(
      "valid-number",
      "Informe um número inteiro maior ou igual a 1",
      (value) => {
        const parsed = Number(String(value ?? "").trim());
        return Number.isInteger(parsed) && parsed >= 1;
      },
    ),
  storeId: Yup.string().required("Loja é obrigatória"),
  productId: Yup.string().required("Produto é obrigatório"),
});
