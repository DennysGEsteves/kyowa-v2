import { useApi } from "@/api/api.hook";
import { useProductLookupsQuery } from "@/api/ProductLookups/product-lookups.query";
import { useInvalidateProductsQuery } from "@/api/Products/products.query";
import { useProvidersQuery } from "@/api/Providers/providers.query";
import { adminRoutes } from "@/routes/adminRoutes";
import type { Product, ProductLookup } from "@entities";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo } from "react";
import {
  emptyProductFormValues,
  productValidationSchema,
  type ProductFormSchema,
} from "./UpsertProduct.schema";
import {
  formValuesToCreateProductDTO,
  formValuesToUpdateProductDTO,
  productToFormValues,
} from "./UpsertProduct.transform";

type UseUpsertProductLogicParams = {
  product?: Product;
  listHref?: string;
};

function lookupSelectOptions(items: ProductLookup[]) {
  return items.map((item) => ({ value: item.id, label: item.name }));
}

export function useUpsertProductLogic({
  product,
  listHref = adminRoutes.products.list,
}: UseUpsertProductLogicParams) {
  const { productsApi } = useApi();
  const invalidateProducts = useInvalidateProductsQuery();
  const lookups = useProductLookupsQuery();
  const { data: providers = [] } = useProvidersQuery();
  const router = useRouter();

  const navigateBack = useCallback(() => {
    router.push(listHref);
  }, [router, listHref]);

  const onSubmit = useCallback(
    (values: ProductFormSchema) => {
      if (product) {
        const payload = formValuesToUpdateProductDTO(values);
        productsApi.update(product.id, payload).then(() => {
          invalidateProducts();
          navigateBack();
        });
      } else {
        const payload = formValuesToCreateProductDTO(values);
        productsApi.create(payload).then(() => {
          invalidateProducts();
          navigateBack();
        });
      }
    },
    [product, productsApi, invalidateProducts, navigateBack],
  );

  const formik = useFormik<ProductFormSchema>({
    enableReinitialize: true,
    initialValues: product
      ? productToFormValues(product)
      : emptyProductFormValues,
    validationSchema: productValidationSchema,
    onSubmit,
  });

  const { values, setFieldValue } = formik;
  const sealsEnabled = values.hasSeals;

  useEffect(() => {
    if (!sealsEnabled) {
      setFieldValue("amountStart", "");
      setFieldValue("amountUnlimited", false);
    }
  }, [sealsEnabled, setFieldValue]);

  const providerOptions = useMemo(
    () =>
      providers.map((provider) => ({
        value: provider.id,
        label: provider.name,
      })),
    [providers],
  );

  const categoryOptions = useMemo(
    () => lookupSelectOptions(lookups.categories),
    [lookups.categories],
  );
  const unitOptions = useMemo(
    () => lookupSelectOptions(lookups.units),
    [lookups.units],
  );
  const colorOptions = useMemo(
    () => lookupSelectOptions(lookups.colors),
    [lookups.colors],
  );
  const sizeOptions = useMemo(
    () => lookupSelectOptions(lookups.sizes),
    [lookups.sizes],
  );
  const designOptions = useMemo(
    () => lookupSelectOptions(lookups.designs),
    [lookups.designs],
  );
  const shapeOptions = useMemo(
    () => lookupSelectOptions(lookups.shapes),
    [lookups.shapes],
  );
  const originOptions = useMemo(
    () => lookupSelectOptions(lookups.origins),
    [lookups.origins],
  );
  const modelOptions = useMemo(
    () => lookupSelectOptions(lookups.models),
    [lookups.models],
  );

  return {
    formik,
    sealsEnabled,
    providerOptions,
    categoryOptions,
    unitOptions,
    colorOptions,
    sizeOptions,
    designOptions,
    shapeOptions,
    originOptions,
    modelOptions,
    navigateBack,
    listHref,
    title: product ? "Editar produto" : "Novo produto",
    isEdit: Boolean(product),
    backLabel: "Voltar aos produtos",
  };
}
