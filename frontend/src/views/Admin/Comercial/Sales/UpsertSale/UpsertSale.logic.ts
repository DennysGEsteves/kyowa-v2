import { useApi } from "@/api/api.hook";
import { useInvalidateSalesQuery } from "@/api/Sales/sales.query";
import { useProductLookupQuery } from "@/api/ProductLookups/product-lookups.query";
import { useProductsQuery } from "@/api/Products/products.query";
import { useClientStoreArchitectLookups } from "@/hooks/useClientStoreArchitectLookups";
import { useUsersQuery } from "@/api/Users/users.query";
import { routes } from "@routes";
import type { Sale } from "@entities";
import { getSessionUser } from "@/utils";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import {
  salesValidationSchema,
  emptySalesFormValues,
  type SalesFormSchema,
} from "./UpsertSale.schema";
import {
  formValuesToCreateSaleDTO,
  formValuesToUpdateSaleDTO,
  saleToFormValues,
} from "./UpsertSale.transform";

type UseUpsertSalesLogicParams = {
  sale?: Sale;
  listHref?: string;
};

export function useUpsertSalesLogic({
  sale,
  listHref = routes.sales.href,
}: UseUpsertSalesLogicParams) {
  const { salesApi } = useApi();
  const invalidateSales = useInvalidateSalesQuery();
  const router = useRouter();
  const { clients, stores, architects } = useClientStoreArchitectLookups();
  const { data: users = [] } = useUsersQuery();
  const { data: categories = [] } = useProductLookupQuery("categories");
  const { data: products = [] } = useProductsQuery();

  const navigateBack = useCallback(() => {
    router.push(listHref);
  }, [router, listHref]);

  const storeOptions = useMemo(
    () => stores.map((store) => ({ value: store.id, label: store.name })),
    [stores],
  );

  const sellerOptions = useMemo(
    () =>
      users
        .filter(
          (user) => user.permission === "sales" && user.active !== false,
        )
        .sort((a, b) => a.name.localeCompare(b.name, "pt-BR"))
        .map((user) => ({ value: user.id, label: user.name })),
    [users],
  );

  const clientDisplayValue = useMemo(() => {
    if (!sale?.clientId) return "";
    return clients.find((client) => client.id === sale.clientId)?.name ?? "";
  }, [sale, clients]);

  const architectDisplayValue = useMemo(() => {
    if (!sale?.architectId) return "";
    return (
      architects.find((architect) => architect.id === sale.architectId)?.name ??
      ""
    );
  }, [sale, architects]);

  const categoryOptions = useMemo(
    () =>
      categories.map((category) => ({
        value: category.id,
        label: category.name,
      })),
    [categories],
  );

  const initialValues = useMemo((): SalesFormSchema => {
    if (sale) {
      return saleToFormValues(sale, products);
    }
    const sessionUser = getSessionUser();
    return {
      ...emptySalesFormValues,
      sellerId: sessionUser?.id ?? "",
    };
  }, [sale, products]);

  const onSubmit = useCallback(
    (values: SalesFormSchema) => {
      if (sale) {
        const payload = formValuesToUpdateSaleDTO(values, sale.paidAt);
        salesApi.update(sale.id, payload).then(() => {
          invalidateSales();
          navigateBack();
        });
        return;
      }

      const payload = formValuesToCreateSaleDTO(values);
      salesApi.create(payload).then(() => {
        invalidateSales();
        navigateBack();
      });
    },
    [sale, salesApi, invalidateSales, navigateBack],
  );

  const formik = useFormik<SalesFormSchema>({
    enableReinitialize: true,
    initialValues,
    validationSchema: salesValidationSchema,
    onSubmit,
  });

  return {
    formik,
    storeOptions,
    sellerOptions,
    clientDisplayValue,
    architectDisplayValue,
    categoryOptions,
    products,
    navigateBack,
    listHref,
    title: sale ? "Editar venda" : "Nova venda",
    backLabel: "Voltar às vendas",
    isEdit: Boolean(sale),
  };
}
