import * as Yup from "yup";

export type LookupFormSchema = {
  name: string;
};

export const emptyLookupFormValues: LookupFormSchema = {
  name: "",
};

export const lookupValidationSchema = Yup.object<LookupFormSchema>({
  name: Yup.string().max(100).required("Nome é obrigatório"),
});
