import { parseCurrencyBRL } from "@/utils/masks";
import * as Yup from "yup";

export type SaleCheckoutFormItem = {
  /** `null` = usuário ainda não escolheu com/sem lacre */
  hasSeal: boolean | null;
  sealId: string;
  /** Preenchido automaticamente pela busca do lacre no estoque */
  sealProductName: string;
  value: string;
  categoryId: string;
  productId: string;
  quantity: string;
};

export type ConsignmentFormSchema = {
  clientId: string;
  sellerId: string;
  storeId: string;
  architectId: string;
  architectParticipation: boolean;
  obsReceipt: string;
  obsInternal: string;
  checkout: SaleCheckoutFormItem[];
};

export const emptyCheckoutItem: SaleCheckoutFormItem = {
  hasSeal: null,
  sealId: "",
  sealProductName: "",
  value: "",
  categoryId: "",
  productId: "",
  quantity: "1",
};

export const emptyConsignmentFormValues: ConsignmentFormSchema = {
  clientId: "",
  sellerId: "",
  storeId: "",
  architectId: "",
  architectParticipation: false,
  obsReceipt: "",
  obsInternal: "",
  checkout: [],
};

const checkoutItemSchema = Yup.object({
  hasSeal: Yup.boolean()
    .nullable()
    .oneOf([true, false], "Informe se o item tem lacre")
    .required("Informe se o item tem lacre"),
  sealId: Yup.string().when("hasSeal", {
    is: true,
    then: (schema) =>
      schema
        .required("Número do lacre é obrigatório")
        .test("valid-seal", "Número do lacre inválido", (value) => {
          const parsed = Number(String(value ?? "").trim());
          return Number.isInteger(parsed) && parsed >= 1;
        }),
    otherwise: (schema) => schema,
  }),
  categoryId: Yup.string().when("hasSeal", {
    is: false,
    then: (schema) => schema.required("Categoria é obrigatória"),
    otherwise: (schema) => schema,
  }),
  productId: Yup.string().test(
    "checkout-product",
    "Produto é obrigatório",
    function validateProductId(value) {
      const { hasSeal } = this.parent as SaleCheckoutFormItem;
      if (hasSeal === false && !String(value ?? "").trim()) {
        return this.createError({ message: "Produto é obrigatório" });
      }
      if (hasSeal === true && !String(value ?? "").trim()) {
        return this.createError({
          message: "Lacre não encontrado no estoque para esta loja",
        });
      }
      return true;
    },
  ),
  sealProductName: Yup.string(),
  quantity: Yup.string().when("hasSeal", {
    is: false,
    then: (schema) =>
      schema
        .required("Quantidade é obrigatória")
        .test("valid-qty", "Quantidade inválida", (value) => {
          const parsed = Number(String(value ?? "").trim());
          return Number.isInteger(parsed) && parsed >= 1;
        }),
    otherwise: (schema) => schema,
  }),
  value: Yup.string().when("hasSeal", {
    is: (hasSeal: boolean | null) => hasSeal === true || hasSeal === false,
    then: (schema) =>
      schema
        .required("Valor é obrigatório")
        .test("valid-value", "Valor inválido", (value) => {
          if (!value?.trim()) return false;
          return parseCurrencyBRL(value) !== undefined;
        }),
    otherwise: (schema) => schema,
  }),
});

export const consignmentValidationSchema = Yup.object<ConsignmentFormSchema>({
  clientId: Yup.string().required("Cliente é obrigatório"),
  sellerId: Yup.string().required("Vendedor é obrigatório"),
  storeId: Yup.string().required("Loja é obrigatória"),
  architectId: Yup.string(),
  architectParticipation: Yup.boolean().required(),
  obsReceipt: Yup.string(),
  obsInternal: Yup.string(),
  checkout: Yup.array().of(checkoutItemSchema),
});
