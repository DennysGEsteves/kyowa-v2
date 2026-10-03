import * as Yup from "yup";

export type ProductFormSchema = {
  name: string;
  fantasyName: string;
  providerId: string;
  categoryId: string;
  ref: string;
  unitId: string;
  colorId: string;
  sizeId: string;
  designId: string;
  shapeId: string;
  originId: string;
  modelId: string;
  ncm: string;
  cst: string;
  ean: string;
  buyPrice: string;
  sellPrice: string;
  hasSeals: boolean;
  amountStart: string;
  amountUnlimited: boolean;
  isEcommerce: boolean;
};

export const emptyProductFormValues: ProductFormSchema = {
  name: "",
  fantasyName: "",
  providerId: "",
  categoryId: "",
  ref: "",
  unitId: "",
  colorId: "",
  sizeId: "",
  designId: "",
  shapeId: "",
  originId: "",
  modelId: "",
  ncm: "",
  cst: "",
  ean: "",
  buyPrice: "",
  sellPrice: "",
  hasSeals: false,
  amountStart: "",
  amountUnlimited: false,
  isEcommerce: false,
};

export const productValidationSchema = Yup.object<ProductFormSchema>({
  name: Yup.string().max(100).required("Nome é obrigatório"),
  fantasyName: Yup.string().max(100).required("Nome fantasia é obrigatório"),
  providerId: Yup.string(),
  categoryId: Yup.string(),
  ref: Yup.string().max(20),
  unitId: Yup.string(),
  colorId: Yup.string(),
  sizeId: Yup.string(),
  designId: Yup.string(),
  shapeId: Yup.string(),
  originId: Yup.string(),
  modelId: Yup.string(),
  ncm: Yup.string().max(50),
  cst: Yup.string().max(50),
  ean: Yup.string().max(50),
  buyPrice: Yup.string(),
  sellPrice: Yup.string(),
  hasSeals: Yup.boolean().required(),
  amountStart: Yup.string(),
  amountUnlimited: Yup.boolean().required(),
  isEcommerce: Yup.boolean().required(),
});
