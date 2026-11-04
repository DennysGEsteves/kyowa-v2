import { parseCurrencyBRL } from "@/utils/masks";
import * as Yup from "yup";

export const SALE_CHECKOUT_LINE_KINDS = [
  "with_seal",
  "without_seal",
  "linked_order",
  "loose",
] as const;

export type SaleCheckoutLineKind = (typeof SALE_CHECKOUT_LINE_KINDS)[number];

export type SaleCheckoutFormItem = {
  /** `null` = usuário ainda não escolheu o tipo do item */
  lineKind: SaleCheckoutLineKind | null;
  sealId: string;
  /** Preenchido automaticamente pela busca do lacre no estoque */
  sealProductName: string;
  value: string;
  categoryId: string;
  productId: string;
  quantity: string;
  orderId: string;
  description: string;
};

export type SalesFormSchema = {
  clientId: string;
  sellerId: string;
  storeId: string;
  architectId: string;
  architectParticipation: boolean;
  obsReceipt: string;
  obsInternal: string;
  isPaid: boolean;
  checkout: SaleCheckoutFormItem[];
};

export const emptyCheckoutItem: SaleCheckoutFormItem = {
  lineKind: null,
  sealId: "",
  sealProductName: "",
  value: "",
  categoryId: "",
  productId: "",
  quantity: "1",
  orderId: "",
  description: "",
};

export const emptySalesFormValues: SalesFormSchema = {
  clientId: "",
  sellerId: "",
  storeId: "",
  architectId: "",
  architectParticipation: false,
  obsReceipt: "",
  obsInternal: "",
  isPaid: false,
  checkout: [],
};

const checkoutItemSchema = Yup.object({
  lineKind: Yup.string()
    .nullable()
    .oneOf([...SALE_CHECKOUT_LINE_KINDS], "Selecione o tipo do item")
    .required("Selecione o tipo do item"),
  sealId: Yup.string().when("lineKind", {
    is: "with_seal",
    then: (schema) =>
      schema
        .required("Número do lacre é obrigatório")
        .test("valid-seal", "Número do lacre inválido", (value) => {
          const parsed = Number(String(value ?? "").trim());
          return Number.isInteger(parsed) && parsed >= 1;
        }),
    otherwise: (schema) => schema,
  }),
  categoryId: Yup.string().when("lineKind", {
    is: "without_seal",
    then: (schema) => schema.required("Categoria é obrigatória"),
    otherwise: (schema) => schema,
  }),
  productId: Yup.string().test(
    "checkout-product",
    "Produto é obrigatório",
    function validateProductId(value) {
      const { lineKind } = this.parent as SaleCheckoutFormItem;
      if (lineKind === "without_seal" && !String(value ?? "").trim()) {
        return this.createError({ message: "Produto é obrigatório" });
      }
      if (lineKind === "with_seal" && !String(value ?? "").trim()) {
        return this.createError({
          message: "Lacre não encontrado no estoque para esta loja",
        });
      }
      return true;
    },
  ),
  orderId: Yup.string(),
  description: Yup.string().when("lineKind", {
    is: "loose",
    then: (schema) => schema.required("Descrição é obrigatória"),
    otherwise: (schema) => schema,
  }),
  sealProductName: Yup.string(),
  quantity: Yup.string().when("lineKind", {
    is: (lineKind: SaleCheckoutLineKind | null) =>
      lineKind === "without_seal" || lineKind === "loose",
    then: (schema) =>
      schema
        .required("Quantidade é obrigatória")
        .test("valid-qty", "Quantidade inválida", (value) => {
          const parsed = Number(String(value ?? "").trim());
          return Number.isInteger(parsed) && parsed >= 1;
        }),
    otherwise: (schema) => schema,
  }),
  value: Yup.string().when("lineKind", {
    is: (lineKind: SaleCheckoutLineKind | null) => lineKind != null,
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

export const salesValidationSchema = Yup.object<SalesFormSchema>({
  clientId: Yup.string().required("Cliente é obrigatório"),
  sellerId: Yup.string().required("Vendedor é obrigatório"),
  storeId: Yup.string().required("Loja é obrigatória"),
  architectId: Yup.string(),
  architectParticipation: Yup.boolean().required(),
  isPaid: Yup.boolean().required(),
  obsReceipt: Yup.string(),
  obsInternal: Yup.string(),
  checkout: Yup.array().of(checkoutItemSchema),
});
