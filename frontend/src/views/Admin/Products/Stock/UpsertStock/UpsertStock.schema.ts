import * as Yup from "yup";

export type StockFormSchema = {
  productId: string;
  storeId: string;
  sealNumbers: number[];
};

export const emptyStockFormValues: StockFormSchema = {
  productId: "",
  storeId: "",
  sealNumbers: [],
};

export const stockValidationSchema = Yup.object<StockFormSchema>({
  productId: Yup.string().required("Produto é obrigatório"),
  storeId: Yup.string().required("Loja é obrigatória"),
  sealNumbers: Yup.array()
    .of(
      Yup.number()
        .integer("Número de lacra inválido")
        .min(1, "Número de lacra inválido"),
    )
    .min(1, "Informe ao menos um número de lacra")
    .test(
      "unique-seal-numbers",
      "Não repita o mesmo número de lacra",
      (values) => {
        if (!values) {
          return true;
        }
        return new Set(values).size === values.length;
      },
    ),
});
