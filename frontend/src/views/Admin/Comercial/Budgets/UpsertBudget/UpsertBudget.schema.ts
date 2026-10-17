import {
  budgetClosingAtValues,
  budgetClosingLevels,
  budgetLostReasons,
  budgetUpsertStatuses,
} from "@entities";
import { parseCurrencyBRL } from "@/utils/masks";
import * as Yup from "yup";

export type BudgetCheckoutFormItem = {
  quantity: string;
  categoryId: string;
  price: string;
  description: string;
};

export type BudgetFormSchema = {
  storeId: string;
  clientId: string;
  architectId: string;
  obs: string;
  lostReasons: (typeof budgetLostReasons)[number][];
  status: string;
  closingAt: string;
  closingLevel: string;
  checkout: BudgetCheckoutFormItem[];
};

export const emptyCheckoutItem: BudgetCheckoutFormItem = {
  quantity: "",
  categoryId: "",
  price: "",
  description: "",
};

export const emptyBudgetFormValues: BudgetFormSchema = {
  storeId: "",
  clientId: "",
  architectId: "",
  obs: "",
  lostReasons: [],
  status: "open",
  closingAt: "",
  closingLevel: "",
  checkout: [],
};

const checkoutItemSchema = Yup.object({
  quantity: Yup.string()
    .required("Informe a quantidade")
    .test("valid-quantity", "Quantidade inválida", (value) => {
      const parsed = Number(String(value ?? "").trim());
      return Number.isInteger(parsed) && parsed >= 0;
    }),
  categoryId: Yup.string().required("Categoria é obrigatória"),
  price: Yup.string()
    .required("Informe o preço")
    .test("valid-price", "Preço inválido", (value) => {
      return parseCurrencyBRL(String(value ?? "")) !== undefined;
    }),
  description: Yup.string().required("Descrição é obrigatória"),
});

export const budgetValidationSchema = Yup.object<BudgetFormSchema>({
  storeId: Yup.string().required("Loja é obrigatória"),
  clientId: Yup.string(),
  architectId: Yup.string(),
  obs: Yup.string(),
  lostReasons: Yup.array()
    .of(Yup.string().oneOf([...budgetLostReasons]))
    .when("status", {
      is: "lost",
      then: (schema) =>
        schema.min(1, "Selecione ao menos um motivo da perda"),
      otherwise: (schema) => schema,
    }),
  status: Yup.string()
    .required("Status é obrigatório")
    .oneOf([...budgetUpsertStatuses], "Status é obrigatório"),
  closingAt: Yup.string().oneOf(["", ...budgetClosingAtValues]),
  closingLevel: Yup.string().oneOf(["", ...budgetClosingLevels]),
  checkout: Yup.array().of(checkoutItemSchema),
});
